import React, {PropTypes} from 'react';
import {DropTarget} from 'react-dnd';
import styled from 'styled-components';

import {DRAG_TYPES} from '../constants';
import Tile from './draggable-tile';

function handStyles(props) {
  return {
    minHeight: '78px',
    width: '260px',
    backgroundColor: props.isOver ? 'yellow' : 'blue',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '10px',
    position: 'absolute'
  };
}

const TileContainer = styled.div`
  margin: 5px;
`;

const handTarget = {
  drop: (props, monitor) => {
    const tile = monitor.getItem();
    const {onPlaceTile} = props;
    if (onPlaceTile && tile) {
      onPlaceTile(tile);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

function Hand(props) {
  const {connectDropTarget, hand, isOver} = props;

  return connectDropTarget(
    <div style={handStyles({isOver})}>
      {hand.map((tile) => (
        <TileContainer>
          <Tile tile={tile} />
        </TileContainer>
      ))}
    </div>
  );
}

Hand.propTypes = {
  hand: PropTypes.array.isRequired,
  isOver: PropTypes.bool,
  onPlaceTile: PropTypes.func,
  selectedId: PropTypes.number
};

export default DropTarget(DRAG_TYPES.TILE, handTarget, collect)(Hand);
