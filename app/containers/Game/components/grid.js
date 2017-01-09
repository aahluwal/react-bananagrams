import React, {PropTypes} from 'react';
import styled from 'styled-components';

import Tile from './tile';

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

export default function Grid(props) {
  const {grid} = props;
  return (
    <StyledGrid>
      {grid.map((row, rowIndex) => (
        <GridRow>
          {row.map((cell, colIndex) => (
            <GridCell
              borderBottom={rowIndex === grid.length - 1}
              borderRight={colIndex === row.length - 1}
            >
              {cell ?
                <Tile>
                  {cell}
                </Tile> :
                null
              }
            </GridCell>
          ))}
        </GridRow>
      ))}
    </StyledGrid>
  );
}

Grid.propTypes = {
  grid: PropTypes.array
};
