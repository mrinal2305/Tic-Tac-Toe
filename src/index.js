import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';

// // Put any other imports below so that CSS from your
// // components takes precedence over default styles.

// class Square extends React.Component {

//   render() {
//     return (
//       <button 
//       className="square" 
//       onClick={()=>{this.props.onClick()}}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props) {           // Function Components ,an easy way to write componets
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {
  constructor(props){
    super(props);   //The super keyword is used to access and call functions on an object's parent.
    this.state = {
      squares : Array(9).fill(null),
      xIsNext  : true
    }
  }

  handleClick = (i)=>{
    const squares = this.state.squares.slice(); // we call .slice() to create a copy of the squares array
    if (calculateWinner(squares) || squares[i]) { // Calculating Winner
      return; 
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext : !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return <Square 
    value   = {this.state.squares[i]}
    onClick = {()=> this.handleClick(i)}
    />; // Passing value bw components through props
  }
 
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    let code;
    if (winner) {
      code   = 'Winner: '
      status = winner;
    } else {
      code   = 'Next Player :'
      status = (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div class="container">
        <div className="status row">
        <code> {code} </code> <value>{status}</value>
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}