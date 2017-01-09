import React from 'react';
import {connect} from 'react-redux';

import {startGame} from './actions';

export class Game extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      onStartGame,
      hand = [],
      tiles = []
    } = this.props;
    return (
      <div>
        <h1>
          Play Game
          <button onClick={() => onStartGame()}> Start </button>
        </h1>
        <div>
          {hand.map((tile) => (
            <div>{tile}</div>
          ))}
        </div>
        <div>
          {tiles.map((tile) => (
            <div>{tile}</div>
          ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    onStartGame: () => dispatch(startGame())
  }
);

const mapStateToProps = (state) => {
  const gameState = state.get('game');
  return {
    hand: gameState.get('hand'),
    tiles: gameState.get('tiles')
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
