import { useState } from 'react';
import Square from './components/Square';
import WinningPatterns from './assets/WinningPatterns'

import './App.css';

function App() {
  const [board, setBoard] = useState(["T", "I", "K", "T", "O", "K", "T", "O", "E"]);
  const [playerOne, setPlayerOne] = useState({ name: "Player 1", letter: "X" })
  const [playerTwo, setPlayerTwo] = useState({ name: "Player 2", letter: "O" })
  const [currentPlayer, setCurrentPlayer] = useState({ name: "X", letter: "X" })
  const [currentMove, setCurrentMove] = useState(0)
  const [scores, setScores] = useState({ X: 0, O: 0 })

  const onClickSquare = (squareIndex) => {
    if (board[squareIndex]) return false;
    
    const newBoard = [...board]
    newBoard[squareIndex] = currentPlayer.letter || playerOne.letter

    setBoard(newBoard)
    setCurrentMove(currentMove + 1)

    if (currentPlayer?.letter === playerOne.letter || !currentPlayer) {
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
        const newScores = {...scores}
        newScores[currentPlayer.letter] = newScores[currentPlayer.letter] + 1 
        setScores(newScores)
        window.alert(`Winner: ${currentPlayer.name}`)
      }
    })
  }

  const startGame = (e) => {
    e.preventDefault()

    setCurrentPlayer(playerOne)
    setBoard(["", "", "", "", "", "", "", "", ""])
  }

  return (
    <div className="App">
      <h1>Welcome to Tik Tok Toe. Choose your name and press Start to play!</h1>
      <div>
        <form onSubmit={startGame} className="playersDiv">
          <div className="playerInput">
            <label>X: </label>
            <input type="text" id="playerone" value={playerOne?.name || ""} onChange={(e) => setPlayerOne({ name: e.target.value, letter: "X" })} maxLength={18} />
          </div>
          <div className="playerInput">
            <label>O: </label>
            <input type="text" id="playertwo" value={playerTwo?.name || ""} onChange={(e) => setPlayerTwo({ name: e.target.value, letter: "O" })} maxLength={18} />
          </div>
          <input className="playerInput" type="submit" value="Start" onClick={startGame} />
        </form>
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
        <div className="playersDiv">
          <label>Scores:</label>
          <label>{playerOne?.name} (X): {scores[playerOne.letter]}</label>
          <label>{playerTwo?.name} (X): {scores[playerTwo.letter]}</label>
        </div>
      </div>
    </div>
  );
}

export default App;
