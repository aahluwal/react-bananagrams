import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {startGame, selectTile, placeTile, peel} from './actions';
import Grid from './components/grid';
import Hand from './components/hand';
import xhr from 'xhr';

export class Game extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  handleClickPeel(grid) {
    const {onPeel} = this.props;
    // Make async request to check grid state
    xhr({
      body: JSON.stringify(grid),
      uri: '/api/check',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    },
    (err, resp, body) => {
      if (JSON.parse(body).valid) {
        onPeel();
      } else {
        alert('The grid has invalid words');
      }
    });
  }

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
          {hand.length === 0 ?
            <button onClick={() => this.handleClickPeel(grid)}>Peel</button> :
            null
          }
        </h1>
        <div>
          <Hand selectedId={selectedId} onSelectTile={onSelectTile} hand={hand} />
          <Grid onPlaceTile={onPlaceTile} grid={grid} selectedId={selectedId} />
        </div>
      </div>
    );
  }
}
//Check grid
//If valid, add 5 tiles to hand
//If not valid, display message and keep hand the same
Game.propTypes = {
  onStartGame: PropTypes.func,
  onSelectTile: PropTypes.func,
  grid: PropTypes.array,
  hand: PropTypes.array,
  selectedId: PropTypes.number,
  onPlaceTile: PropTypes.func,
  onPeel: PropTypes.func

};

const mapDispatchToProps = (dispatch) => (
  {
    onStartGame: () => dispatch(startGame()),
    onSelectTile: (tile) => dispatch(selectTile(tile)),
    onPlaceTile: (row, column) => dispatch(placeTile(row, column)),
    onPeel: () => dispatch(peel())
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
