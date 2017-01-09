import React, {PropTypes} from 'react';
import styled from 'styled-components';

import Tile from './tile';

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

export default function Hand(props) {
  const {hand} = props;
  return (
    <HandContainer>
      {hand.map((tile) => (
        <StyledTile>
          {tile}
        </StyledTile>
      ))}
    </HandContainer>
  );
}

Hand.propTypes = {
  hand: PropTypes.array.isRequired
};
