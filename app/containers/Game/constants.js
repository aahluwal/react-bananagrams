export const START_GAME = 'bananagrams/Game/START_GAME';
export const GET_TILES = 'bananagrams/Game/GET_TILES';
export const SELECT_TILE = 'bananagrams/Game/SELECT_TILE';
export const PLACE_TILE = 'bananagrams/Game/PLACE_TILE';
export const PEEL = 'bananagrams/Game/PEEL';
export const NUM_TILES_AFTER_PEEL = 5;



// Game Constants
export const TILE_DISTRIBUTION = {
  a: 13,
  b: 3,
  c: 3,
  d: 6,
  e: 18,
  f: 3,
  g: 4,
  h: 3,
  i: 12,
  j: 2,
  k: 2,
  l: 5,
  m: 3,
  n: 8,
  o: 11,
  p: 3,
  q: 2,
  r: 9,
  s: 6,
  t: 9,
  u: 6,
  v: 3,
  w: 3,
  x: 2,
  y: 3,
  z: 2
};
export const TILE_LIST = [];
Object.keys(TILE_DISTRIBUTION).forEach((char) => {
  for (let i = 0; i < TILE_DISTRIBUTION[char]; i += 1) {
    TILE_LIST.push({
      char,
      id: TILE_LIST.length
    });
  }
});

export const GAME_SETTINGS = {
  gridSize: 15,
  initialHandSize: 15
};
