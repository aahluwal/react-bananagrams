/*
 *
 * Game reducer
 *
 */

import {fromJS} from 'immutable';
import deepcopy from 'deepcopy';
import {
  START_GAME,
  SELECT_TILE,
  PLACE_TILE
} from './constants';

const initialState = fromJS({
  grid: [],
  hand: [],
  tiles: [],
  selectedId: null
});


function placeTileOnGrid(tile, rowIndex, columnIndex, grid) {
  const gridCopy = deepcopy(grid);
  gridCopy[rowIndex][columnIndex] = tile;
  return gridCopy;
}

function removeTileFromHand(tile, hand) {
  const newTiles = [];
  hand.forEach((t) => {
    if (t.id !== tile.id) {
      newTiles.push(t);
    }
  });
  return newTiles;
}

function removeTileFromGrid(tileToRemove, grid) {
  const newGrid = deepcopy(grid);
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      const tile = newGrid[i][j];
      newGrid[i][j] = tile && tile.id === tileToRemove.id ? null : tile;
    }
  }
  return newGrid;
}

function getSelectedTile(state) {
  const selectedId = state.get('selectedId');
  const hand = state.get('hand');
  const grid = state.get('grid');
  for (let i = 0; i < hand.length; i += 1) {
    const tile = hand[i];
    if (tile.id === selectedId) {
      return tile;
    }
  }
  for (let i = 0; i < grid.length; i+= 1) {
    for (let j = 0; j < grid[i].length; j+= 1) {
      const tile = grid[i][j];
      if (tile && tile.id === selectedId) {
        return tile;
      }
    }
  }
  return null;
}

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return state
        .set('grid', action.grid)
        .set('hand', action.hand)
        .set('tiles', action.tiles);
    case SELECT_TILE: {
      const selectedId = state.get('selectedId');
      const {tileId} = action;
      return state
        .set('selectedId', tileId === selectedId ? null : action.tileId);
    }
    case PLACE_TILE: {
      const {rowIndex, columnIndex} = action;
      const grid = state.get('grid');
      const selectedTile = getSelectedTile(state);
      const tileInGrid = grid[rowIndex][columnIndex];

      if (selectedTile && !tileInGrid) {
        // Placing a tile in the grid
        const newHand = removeTileFromHand(selectedTile, state.get('hand'));
        const gridWithoutSelected = removeTileFromGrid(selectedTile, state.get('grid'));
        const newGrid = placeTileOnGrid(selectedTile, rowIndex, columnIndex, gridWithoutSelected);

        return state
          .set('grid', newGrid)
          .set('hand', newHand)
          .set('selectedId', null);
      } else if (tileInGrid) {
        if (selectedTile && selectedTile.id === tileInGrid.id) {
          return state
            .set('selectedId', null);
        }
        // Select tile in grid
        return state
          .set('selectedId', tileInGrid.id);
      }
      return state;
    }
    default:
      return state;
  }
}

export default gameReducer;
