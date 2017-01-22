import React, {PropTypes} from 'react';
import {DragSource} from 'react-dnd';

import {DRAG_TYPES} from '../constants';

function tileStyles(props) {
  return {
    backgroundColor: '#fffad1',
    borderRadius: '4px',
    fontSize: '24px',
    fontWeight: 500,
    height: '48px',
    lineHeight: '48px',
    textAlign: 'center',
    textTransform: 'uppercase',
    userSelect: 'none',
    visibility: props.isDragging ? 'hidden' : 'visible',
    width: '48px'
  };
}

const tileSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const tile = props.tile;
    return tile;
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

function Tile(props) {
  const {
    connectDragSource,
    tile
  } = props;
  const styles = tileStyles(props);
  return connectDragSource(
    <div style={styles}>
      {tile.char}
    </div>
  );
}

Tile.propTypes = {
  tile: PropTypes.object
};

export default DragSource(DRAG_TYPES.TILE, tileSource, collect)(Tile);
