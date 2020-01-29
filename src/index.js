import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
// // Put any other imports below so that CSS from your
// // components takes precedence over default styles.

class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {/* TODO */}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }
 
  render() {
    const status = 'X';

    return (
      <div class="container">
        <div className="status row">
        <code> Next player: </code> <value>{status}</value>
        </div>
        <div>
        <div className="board-row row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
     <div className="container game">
        <div class="row">
        <div class="col-3"></div>
        <div class="col-8">

        <div class="row title">
           Tic Tac Toe
        </div>

        <div class="row subtitle">
          A Fun Project By <b>Mrinal Kumar Karn</b>
        </div>

        <div class="game-board row">
          <Board />
        </div>

        <div class="game-info row">
            <div>{ /*status*/ }</div>
            <ol>{ /*TODO*/ }</ol>
        </div>
        </div>
        <div class="col-1"></div>
      </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
