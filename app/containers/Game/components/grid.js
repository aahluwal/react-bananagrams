import React, {PropTypes} from 'react';
import styled from 'styled-components';

import {GAME_SETTINGS} from '../constants';
import GridCell from './grid-cell';

const CELL_WIDTH = 54;
const gridWidth = CELL_WIDTH * GAME_SETTINGS.gridSize;

const StyledGrid = styled.div`
  height: 100%;
  position: absolute;
  left: 300px;
`;

const GridRow = styled.div`
  border-right: 1px dashed black;
  border-top: 1px dashed black;
  height: ${CELL_WIDTH + 2}px;
  width: ${gridWidth + 1}px;
  &:last-child {
    border-bottom: 1px dashed black;
  }
`;

export default function Grid(props) {
  const {grid, onPlaceTile} = props;

  return (
    <StyledGrid>
      {grid.map((row, rowIndex) => (
        <GridRow>
          {row.map((tile, columnIndex) => (
            <GridCell tile={tile} onPlaceTile={(placedTile) => onPlaceTile(placedTile, rowIndex, columnIndex)} />
          ))}
        </GridRow>
      ))}
    </StyledGrid>
  );
}

Grid.propTypes = {
  grid: PropTypes.array,
  onPlaceTile: PropTypes.func
};
