import React, {PropTypes} from 'react';
import {DropTarget} from 'react-dnd';

import {DRAG_TYPES} from '../constants';
import Tile from './draggable-tile';

function gridCellStyles(props) {
  return {
    backgroundColor: props.isOver ? 'yellow' : 'white',
    borderLeft: '1px dashed black',
    display: 'inline-block',
    height: '54px',
    verticalAlign: 'middle',
    width: '54px'
  };
}

const cellTarget = {
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

function GridCell(props) {
  const {connectDropTarget, tile} = props;
  return connectDropTarget(
    <div style={gridCellStyles(props)}>
      {tile && <Tile tile={tile} />}
    </div>
  );
}

GridCell.propTypes = {
  isOver: PropTypes.bool,
  onPlaceTile: PropTypes.func,
  tile: PropTypes.object
};

export default DropTarget(DRAG_TYPES.TILE, cellTarget, collect)(GridCell);
