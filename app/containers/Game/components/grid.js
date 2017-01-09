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
  border: 1px dotted black;
  display: inline-block;
  height: 52px;
  vertical-align: middle;
  width: 52px;
`;

export default function Grid(props) {
  const {grid} = props;
  return (
    <StyledGrid>
      {grid.map((row) => (
        <GridRow>
          {row.map((cell) => (
            <GridCell>
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
