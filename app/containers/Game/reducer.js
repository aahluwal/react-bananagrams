/*
 *
 * Game reducer
 *
 */

import {fromJS} from 'immutable';
import deepcopy from 'deepcopy';
import {
  START_GAME,
  PLACE_TILE_IN_GRID,
  PLACE_TILE_IN_HAND,
  PEEL,
  NUM_TILES_AFTER_PEEL
} from './constants';

const initialState = fromJS({
  grid: [],
  hand: [],
  tiles: []
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

function isTileInHand(tile, hand) {
  return hand.some((t) => t.id === tile.id);
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

// After valid PEEL
function getNewTiles(tiles, hand) {
  const newTiles = tiles.slice();
  const newHand = hand.slice();
  for (let i = 0; i < NUM_TILES_AFTER_PEEL; i += 1) {
    const tile = newTiles.pop();
    newHand.push(tile);
  }
  return {
    hand: newHand,
    tiles: newTiles
  };
}

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return state
        .set('grid', action.grid)
        .set('hand', action.hand)
        .set('tiles', action.tiles);
    case PEEL: {
      const prevHand = state.get('hand');
      const {hand, tiles} = getNewTiles(state.get('tiles'), prevHand);
      return state
        .set('hand', hand)
        .set('tiles', tiles);
    }
    case PLACE_TILE_IN_HAND: {
      const {tile} = action;
      const hand = state.get('hand');
      const grid = state.get('grid');

      if (isTileInHand(tile, hand)) {
        return state;
      }

      // Placing a tile in the hand
      const newGrid = removeTileFromGrid(tile, grid);
      const newHand = hand.concat([tile]);

      return state
        .set('grid', newGrid)
        .set('hand', newHand);
    }
    case PLACE_TILE_IN_GRID: {
      const {tile, rowIndex, columnIndex} = action;
      const grid = state.get('grid');
      const tileInGrid = grid[rowIndex][columnIndex];

      if (tileInGrid) {
        return state;
      }

      // Placing a tile in the grid
      const newHand = removeTileFromHand(tile, state.get('hand'));
      const gridWithoutTile = removeTileFromGrid(tile, state.get('grid'));
      const newGrid = placeTileOnGrid(tile, rowIndex, columnIndex, gridWithoutTile);

      return state
        .set('grid', newGrid)
        .set('hand', newHand);
    }
    default:
      return state;
  }
}

export default gameReducer;
