import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// // Put any other imports below so that CSS from your
// // components takes precedence over default styles.

// class Square extends React.Component {

//   render() {
//     return (
//       <button 
//       classNameName="square" 
//       onClick={()=>{this.props.onClick()}}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props) {           // Function Components ,an easy way to write componets

  var temp = true;
  temp   = props.value;
  if(temp){
    return (
      <button className="square value" onClick={props.onClick}>
        <p>{props.value}</p>
      </button>
    );
  }
  else {
    return (
      <button className="square empty" onClick={props.onClick}>
        <p>{props.value}</p>
      </button>
    );
  }

}


class Board extends React.Component {
  // constructor(props){
  //   super(props);   //The super keyword is used to access and call functions on an object's parent.
  //   this.state = {
  //     squares : Array(9).fill(null),
  //     xIsNext  : true
  //   }
  // }

  // handleClick = (i)=>{
  //   const squares = this.state.squares.slice(); // we call .slice() to create a copy of the squares array
  //   if (calculateWinner(squares) || squares[i]) { //ignoring a click if someone has won the game or if a Square is already filled 
  //     return; 
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     squares: squares,
  //     xIsNext : !this.state.xIsNext
  //   });
  // }

  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />; // Passing value bw components through props
  }

  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // let code;
    // if (winner) {
    //   code   = 'Winner: '
    //   status = winner;
    // } else {
    //   code   = 'Next Player :'
    //   status = (this.state.xIsNext ? 'X' : 'O');
    // }

    return (
      <div className="container">
        <div className='board'>
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
  constructor(props) {
    super(props);
    this.state = {                             // Now all control from Game Component
      history: [{
        squares: Array(9).fill(null),          // Initial all array is null ,showing starting state
        moves     : 0
      }],
      xIsNext: true
    }
  }

  handleClick = (i) => {
 
    const current = this.state.history[this.state.history.length - 1];
    console.log(this.state.history);                       

    const square = current.squares.slice();                         //saving the history
    if (calculateWinner(square) || square[i]) {             //ignoring a click if someone has won the game or if a Square is already filled 
      return;
    } 
     
    square[i] = this.state.xIsNext ? 'X' : 'O';
    const move = current.moves +1;

    this.setState({
      history : this.state.history.concat([{
        squares:square,
        moves  :move  
      }]),
      xIsNext: !this.state.xIsNext,       // Changed the state,
    });
  
  }

  handleRestart = ()=>{
    console.log('Restart Working');
  }

  handleInfo = ()=>{
    console.log('Info click working')
  }

  render() {
    const current = this.state.history[this.state.history.length - 1];
    const winner = calculateWinner(current.squares);  //Finding winner
    let status;
    let code;
    if (winner) {                   // Declaring Winner
      code = 'Winner: '
      status = winner;
    } else {
      code = 'Next Player :'
      status =
       (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className=" game container">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-8">

            <div className="row title">
              Tic Tac Toe
        </div>

            <div className="row subtitle">
              A Fun Project By <b>Mrinal Kumar Karn</b>
            </div>
            <div className='row'>

              <div className='col-8'>
                <div className="status row">
                  <code> {code} </code> <p>{status}</p>
                </div>

                <div className="game-board row">
                  <Board
                    squares={current.squares}
                    onClick={this.handleClick} />
                </div>
              </div>
              
              <div className="col-4 btn-group-vertical game-info">
                <button className='button restart' onClick={this.handleRestart}><p>Restart</p></button>
                <button className='button info'    onClick={this.handleInfo}>   <p>Go to 1</p></button>
                <button className='button info'>   <p>Go to 2</p></button>
                <button className='button info'>   <p>Go to 3</p></button>
             </div>

            </div>
          </div>
          <div className="col-1"></div>
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
serviceWorker.unregister();

function calculateWinner(squares) { // Calculting Winner function
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
    if (squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}