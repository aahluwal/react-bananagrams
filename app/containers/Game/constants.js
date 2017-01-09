export const START_GAME = 'bananagrams/Game/START_GAME';
export const GET_TILES = 'bananagrams/Game/GET_TILES';

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
  for (let i = 0; i < TILE_DISTRIBUTION[char]; i++) {
    TILE_LIST.push(char);
  }
});

export const GAME_SETTINGS = {
  initialHandSize: 15
};
