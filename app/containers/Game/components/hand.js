import React, {PropTypes} from 'react';
import styled from 'styled-components';

import Tile, {SelectedTile} from './tile';

const HandContainer = styled.div`
  width: 260px;
  background-color: blue;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
`;

const StyledTile = styled(Tile)`
  margin: 5px;
`;

const SelectedStyledTile = styled(SelectedTile)`
  margin: 5px;
`;

export default function Hand(props) {
  const {hand, onSelectTile, selectedId} = props;
  function onClickTile(tile) {
    onSelectTile(tile);
  }
  return (
    <HandContainer>
      {hand.map((tile) => (
        tile.id === selectedId ?
          (<SelectedStyledTile onClick={() => onClickTile(tile)}>
            {tile.char}
          </SelectedStyledTile>) :
          (<StyledTile onClick={() => onClickTile(tile)}>
            {tile.char}
          </StyledTile>)
      ))}
    </HandContainer>
  );
}

Hand.propTypes = {
  hand: PropTypes.array.isRequired,
  onSelectTile: PropTypes.func,
  selectedId: PropTypes.number
};
