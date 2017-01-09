import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {startGame} from './actions';
import Grid from './components/grid';
import Hand from './components/hand';

export class Game extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      onStartGame,
      grid = [],
      hand = []
    } = this.props;
    return (
      <div>
        <h1>
          Play Game
          <button onClick={() => onStartGame()}> Start </button>
        </h1>
        <div>
          <Hand hand={hand} />
          <Grid grid={grid} />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  onStartGame: PropTypes.func,
  grid: PropTypes.array,
  hand: PropTypes.array
};

const mapDispatchToProps = (dispatch) => (
  {
    onStartGame: () => dispatch(startGame())
  }
);

const mapStateToProps = (state) => {
  const gameState = state.get('game');
  return {
    grid: gameState.get('grid'),
    hand: gameState.get('hand'),
    tiles: gameState.get('tiles')
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
