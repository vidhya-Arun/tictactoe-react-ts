
import React from "react";
import ReactDOM from 'react-dom/client';
import { NumericLiteral } from "typescript";
import './index.css';

interface Squareprops{
  value: string;
  onClick: Function;
}


 const Square = (props:Squareprops) => (
        <button className="square" onClick={() => props.onClick()}>
          {props.value}
        </button>
 )
interface BoardState {
  grid : Array<string>;
  XisNext : Boolean;
}

  class Board extends React.Component <{}, BoardState> {

    constructor(props:BoardState) {
      super(props);
      this.state = {
        grid: Array(9).fill(null),
        XisNext : true,
      };
    }

    handleClick(index : number){
      const newGrid = [...this.state.grid];
      if (calculateWinner(newGrid) || newGrid[index]){
        return
      }
      newGrid[index]=this.state.XisNext?'X' : 'O';
    this.setState({
      grid : newGrid,
      XisNext : !this.state.XisNext,
    });
    /*
      newGrid[index] = 'X';
      this.setState({
        grid: newGrid,
      });
      */
    }

    renderSquare(i: number) {
      return (
       <Square value={this.state.grid[i] } onClick={()=>this.handleClick(i)}  />
      );
    }
  
    render() {

      const winner = calculateWinner(this.state.grid);
      let status;
      if (winner){
      status = 'Winner :' + winner;
      }
      else{
       status = 'Next player:'+ (this.state.XisNext ? 'X' : 'O');

      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0 )}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  
function calculateWinner(newGrid:any){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for(let i=0;i<lines.length;i++){
    const [a,b,c] = lines[i];
    if(newGrid[a] && newGrid[a]===newGrid[b] && newGrid[a]===newGrid[c]){
      return newGrid[a];
    }
  }
  return null;
}

    // ========================================
  
    const root = ReactDOM.createRoot(document.getElementById("root") as any);
    root.render(<Game />);

    export  {}