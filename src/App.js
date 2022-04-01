import { useState } from 'react';
import Square from './components/Square';

import './App.css';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [playerOne, setPlayerOne] = useState("X")
  const [playerTwo, setPlayerTwo] = useState("O")
  const [currentPlayer, setCurrentPlayer] = useState(null)

  const onClickSquare = (squareIndex) => {
    const newBoard = [...board]
    if (newBoard[squareIndex]) return false;

    newBoard[squareIndex] = currentPlayer || playerOne
    setBoard(newBoard)
    if (currentPlayer === playerOne || !currentPlayer) {
      setCurrentPlayer(playerTwo)
    } else {
      setCurrentPlayer(playerOne)
    }
    
  }

  return (
    <div className="App">
      <div className="board">
        <div className="boardRow">
          <Square 
            value={board[0] || ""} 
            onClickSquare={() => onClickSquare(0)}
          />
          <Square 
            value={board[1] || ""} 
            onClickSquare={() => onClickSquare(1)}
          />
          <Square 
            value={board[2] || ""} 
            onClickSquare={() => onClickSquare(2)}
          />
        </div>
        <div className="boardRow">
          <Square 
            value={board[3] || ""} 
            onClickSquare={() => onClickSquare(3)}
          />
          <Square 
            value={board[4] || ""} 
            onClickSquare={() => onClickSquare(4)}
          />
          <Square 
            value={board[5] || ""} 
            onClickSquare={() => onClickSquare(5)}
          />
        </div>
        <div className="boardRow">
          <Square 
            value={board[6] || ""} 
            onClickSquare={() => onClickSquare(6)}
          />
          <Square 
            value={board[7] || ""} 
            onClickSquare={() => onClickSquare(7)}
          />
          <Square 
            value={board[8] || ""} 
            onClickSquare={() => onClickSquare(8)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
