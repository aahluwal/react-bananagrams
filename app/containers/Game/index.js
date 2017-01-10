import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {startGame, selectTile, placeTile} from './actions';
import Grid from './components/grid';
import Hand from './components/hand';

export class Game extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      onStartGame,
      onSelectTile,
      onPlaceTile,
      grid = [],
      hand = [],
      selectedId = null
    } = this.props;
    return (
      <div>
        <h1>
          Play Game
          <button onClick={() => onStartGame()}> Start </button>
        </h1>
        <div>
          <Hand selectedId={selectedId} onSelectTile={onSelectTile} hand={hand} />
          <Grid onPlaceTile={onPlaceTile} grid={grid} selectedId={selectedId} />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  onStartGame: PropTypes.func,
  onSelectTile: PropTypes.func,
  grid: PropTypes.array,
  hand: PropTypes.array,
  selectedId: PropTypes.number,
  onPlaceTile: PropTypes.func
};

const mapDispatchToProps = (dispatch) => (
  {
    onStartGame: () => dispatch(startGame()),
    onSelectTile: (tile) => dispatch(selectTile(tile)),
    onPlaceTile: (row, column) => dispatch(placeTile(row, column))
  }
);

const mapStateToProps = (state) => {
  const gameState = state.get('game');
  return {
    grid: gameState.get('grid'),
    hand: gameState.get('hand'),
    tiles: gameState.get('tiles'),
    selectedId: gameState.get('selectedId')
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
