
/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  GAME_SETTINGS,
  START_GAME,
  TILE_LIST
} from './constants';

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

function generateGameState() {
  const tiles = TILE_LIST.slice();
  shuffle(tiles);
  const hand = tiles.splice(0, GAME_SETTINGS.initialHandSize);

  return {
    hand,
    tiles
  };
}

export function startGame() {
  return {
    type: START_GAME,
    ...generateGameState()
  };
}
