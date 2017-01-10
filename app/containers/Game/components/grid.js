import React, {PropTypes} from 'react';
import styled from 'styled-components';

import Tile, {SelectedTile} from './tile';

const StyledGrid = styled.div`
  background-color: green;
  height: 100%;
  padding: 20px;
`;

const GridRow = styled.div`
  height: 54px;
`;

const GridCell = styled.div`
  border-bottom: ${(props) => (props.borderBottom ? '1px dashed black' : 'none')};
  border-left: 1px dashed black;
  border-right: ${(props) => (props.borderRight ? '1px dashed black' : 'none')};
  border-top: 1px dashed black;
  display: inline-block;
  height: 52px;
  vertical-align: middle;
  width: 52px;
`;

function GridTile(props) {
  const {isSelected, tile} = props;
  if (!tile) {
    return null;
  }
  if (isSelected) {
    return (
      <SelectedTile>
        {tile.char}
      </SelectedTile>
    );
  }
  return (
    <Tile>
      {tile.char}
    </Tile>
  );
}

GridTile.propTypes = {
  isSelected: PropTypes.bool,
  tile: PropTypes.object
};

export default function Grid(props) {
  const {grid, onPlaceTile, selectedId} = props;

  function onClickGrid(row, column) {
    onPlaceTile(row, column);
  }
  return (
    <StyledGrid>
      {grid.map((row, rowIndex) => (
        <GridRow>
          {row.map((tile, colIndex) => (
            <GridCell
              onClick={() => (onClickGrid(rowIndex, colIndex))}
              borderBottom={rowIndex === grid.length - 1}
              borderRight={colIndex === row.length - 1}
            >
              <GridTile tile={tile} isSelected={tile && tile.id === selectedId} />
            </GridCell>
          ))}
        </GridRow>
      ))}
    </StyledGrid>
  );
}

Grid.propTypes = {
  grid: PropTypes.array,
  onPlaceTile: PropTypes.func,
  selectedId: PropTypes.number
};
