/*
 *
 * Game reducer
 *
 */

import {fromJS} from 'immutable';
import {
  START_GAME
} from './constants';

const initialState = fromJS({
  grid: [],
  hand: [],
  tiles: []
});

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return state
        .set('grid', action.grid)
        .set('hand', action.hand)
        .set('tiles', action.tiles);
    default:
      return state;
  }
}

export default gameReducer;