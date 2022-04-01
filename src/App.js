import { useState } from 'react';
import Square from './components/Square';
import WinningPatterns from './assets/WinningPatterns'

import './App.css';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [playerOne, setPlayerOne] = useState("X")
  const [playerTwo, setPlayerTwo] = useState("O")
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [currentMove, setCurrentMove] = useState(0)

  const onClickSquare = (squareIndex) => {
    if (board[squareIndex]) return false;
    
    const newBoard = [...board]
    newBoard[squareIndex] = currentPlayer || playerOne

    setBoard(newBoard)
    setCurrentMove(currentMove + 1)

    if (currentPlayer === playerOne || !currentPlayer) {
      setCurrentPlayer(playerTwo)
    } else {
      setCurrentPlayer(playerOne)
    }

    if (currentMove > 3) checkWinCondition(newBoard)
    
  }

  const checkWinCondition = (board) => {
    WinningPatterns.forEach((pattern) => {

      const firstSquare = board[pattern[0]]
      // For scalability this could've been done with a for or foreach loop but since we have 3 fixed values 
      // for performance reasons I'm comparing them statically (cheaper than looping through the array)
      if (firstSquare && firstSquare === board[pattern[1]] && firstSquare === board[pattern[2]]) {
        window.alert(`Winner: ${currentPlayer}`)
      }
    })

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
