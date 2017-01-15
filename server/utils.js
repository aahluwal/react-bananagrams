const fs = require('fs');

const wordListPath = require('word-list');

const validWords = fs.readFileSync(wordListPath, 'utf8').split('\n');


function getNeighbors(grid, row, column) {
  const neighbors = [];
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];
  directions.forEach((direction) => {
    const thisRow = grid[row + direction[0]] || [];
    const tile = thisRow[column + direction[1]];
    if (tile) {
      neighbors.push(tile);
    }
  });
  return neighbors;
}


function getTilePositionMap(grid) {
  const map = {};
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      const tile = grid[i][j];
      if (tile) {
        map[tile.id] = {row: i, column: j};
      }
    }
  }
  return map;
}

function getContiguousTiles(grid, row, column, tile) {
  if (!tile) {
    return [];
  }
  const positionMap = getTilePositionMap(grid);
  const tiles = [tile];
  let level = [tile];
  while (level.length) {
    const neighbors = [];
    for (let i = 0; i < level.length; i += 1) {
      const levelTile = level[i];
      const levelPosition = positionMap[levelTile.id];
      const thisNeighbors = getNeighbors(grid, levelPosition.row, levelPosition.column);

      thisNeighbors.forEach((n) => {
        if (!tiles.find((t) => (t.id === n.id)) &&
            !neighbors.find((t) => (t.id === n.id))) {
          neighbors.push(n);
        }
      });
    }
    tiles.push(...neighbors);
    level = neighbors;
  }
  return tiles;
}

function getFirstSetOfContiguousGridTiles(grid) {
  let tiles = [];
  for (let i = 0; i < grid.length; i += 1) {
    const row = grid[i];
    for (let j = 0; j < grid[i].length; j += 1) {
      const tile = row[j];
      if (tile) {
        tiles = getContiguousTiles(grid, i, j, tile);
        return tiles;
      }
    }
  }
  return [];
}

function isContiguousGrid(grid) {
  const contiguousTiles = getFirstSetOfContiguousGridTiles(grid);
  for (let i = 0; i < grid.length; i += 1) {
    const row = grid[i];
    for (let j = 0; j < grid[i].length; j += 1) {
      const tile = row[j];
      if (tile && !contiguousTiles.find((t) => (t.id === tile.id))) {
        return false;
      }
    }
  }
  return true;
}

function getTile(grid, x, y) {
  const row = grid[x];
  if (row) {
    return row[y];
  }
}

function getDownWord(grid, row, column) {
  const wordTiles = [];
  let tile = getTile(grid, row, column);
  let downPosition = row;

  while (tile) {
    wordTiles.push(tile);
    downPosition += 1;
    tile = getTile(grid, downPosition, column);
  }
  return wordTiles;
}

function getRightWord(grid, row, column) {
  const wordTiles = [];
  let tile = getTile(grid, row, column);
  let rightPosition = column;

  while (tile) {
    wordTiles.push(tile);
    rightPosition += 1;
    tile = getTile(grid, row, rightPosition);
  }
  return wordTiles;
}

function isValidWord(wordTiles) {
  const word = [];
  for (let i = 0; i < wordTiles.length; i++) {
    const tile = wordTiles[i];
    word.push(tile.char);
  }
  if (word.length === 1) {
    return true;
  }
  const wordString = word.join('');
  if (validWords.indexOf(wordString) > -1) {
    return true;
  }
  return false;
}


function gridContainsOnlyValidWords(grid) {
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      const tile = getTile(grid, i, j);
      const tileAbove = getTile(grid, i - 1, j);
      const tileLeft = getTile(grid, i, j - 1);
      if (tile && !tileAbove) {
        if (!isValidWord(getDownWord(grid, i, j), validWords)) {
          return false;
        }
      }
      if (tile && !tileLeft) {
        if (!isValidWord(getRightWord(grid, i, j), validWords)) {
          return false;
        }
      }
    }
  }
  return true;
}

function validateGrid(grid) {
  return isContiguousGrid(grid) && gridContainsOnlyValidWords(grid);
}

module.exports = {
  validateGrid: validateGrid
};
