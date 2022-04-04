import { useState } from 'react';
import Square from './components/Square';
import WinningPatterns from './assets/WinningPatterns'

import './App.css';

function App() {
  const [board, setBoard] = useState(["T", "I", "K", "T", "O", "K", "T", "O", "E"]);
  const [playerOne, setPlayerOne] = useState({ name: "Player 1", letter: "X" })
  const [playerTwo, setPlayerTwo] = useState({ name: "Player 2", letter: "O" })
  const [currentPlayer, setCurrentPlayer] = useState({ name: "", letter: "X" })
  const [currentMove, setCurrentMove] = useState(0)
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 })
  const [hasStartedGame, setHasStartedGame] = useState(false)
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [winningPatter, setWinningPattern] = useState([0, 3, 6])

  const onClickSquare = (squareIndex) => {
    if (board[squareIndex] || !isGameRunning) return false;
    
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
    let foundWinner = false
    WinningPatterns.forEach((pattern) => {
      const firstSquare = board[pattern[0]]
      // For scalability this could've been done with a for or foreach loop but since we have 3 fixed values 
      // for performance reasons I'm comparing them statically (cheaper than looping through the array)
      if (firstSquare && firstSquare === board[pattern[1]] && firstSquare === board[pattern[2]]) {
        const newScores = {...scores}
        newScores[currentPlayer.letter] = newScores[currentPlayer.letter] + 1 
        setScores(newScores)
        setIsGameRunning(false)
        setWinningPattern(pattern)
        foundWinner = true
        window.alert(`Winner: ${currentPlayer.name}`)
        return false; 
      }
    })
    if (currentMove > 7 && !foundWinner) {
      setScores({...scores, ties: scores.ties + 1})
      setIsGameRunning(false)
      window.alert("It's a tie!")
    }
  }

  const onClickStartGame = (e) => {
    e.preventDefault()

    setCurrentPlayer(playerOne)
    setBoard(["", "", "", "", "", "", "", "", ""])
    setCurrentMove(0)
    setIsGameRunning(true)
    setHasStartedGame(true)
    setWinningPattern(null)
  }

  const onClickNewGame = (e) => {
    if (!window.confirm("This will reset the board. Do you wish to continue?")) return false;
    //setCurrentPlayer(playerOne)
    setBoard(["", "", "", "", "", "", "", "", ""])
    setIsGameRunning(true)
    setCurrentMove(0)
    setWinningPattern(null)
  }

  const onClickReset = (e) => {
    if (!window.confirm("This will reset the scores and players name. Do you wish to continue?")) return false;
    setCurrentPlayer({ name: "", letter: "X" })
    setPlayerOne({ name: "Player 1", letter: "X" })
    setPlayerTwo({ name: "Player 2", letter: "O" })
    setScores({ X: 0, O: 0, ties: 0 })
    setBoard(["T", "I", "K", "T", "O", "K", "T", "O", "E"])
    setCurrentMove(0)
    setIsGameRunning(false)
    setHasStartedGame(false)
    setWinningPattern([0, 3, 6])
  }

  const renderSquares = () => {
    return (
      <div className="board">
        <div className="boardRow">
          <Square 
            value={board[0] || ""} 
            onClickSquare={() => onClickSquare(0)}
            winningSquare={winningPatter?.some(x => x === 0)}
          />
          <Square 
            value={board[1] || ""} 
            onClickSquare={() => onClickSquare(1)}
            winningSquare={winningPatter?.some(x => x === 1)}
          />
          <Square 
            value={board[2] || ""} 
            onClickSquare={() => onClickSquare(2)}
            winningSquare={winningPatter?.some(x => x === 2)}
          />
        </div>
        <div className="boardRow">
          <Square 
            value={board[3] || ""} 
            onClickSquare={() => onClickSquare(3)}
            winningSquare={winningPatter?.some(x => x === 3)}
          />
          <Square 
            value={board[4] || ""} 
            onClickSquare={() => onClickSquare(4)}
            winningSquare={winningPatter?.some(x => x === 4)}
          />
          <Square 
            value={board[5] || ""} 
            onClickSquare={() => onClickSquare(5)}
            winningSquare={winningPatter?.some(x => x === 5)}
          />
        </div>
        <div className="boardRow">
          <Square 
            value={board[6] || ""} 
            onClickSquare={() => onClickSquare(6)}
            winningSquare={winningPatter?.some(x => x === 6)}
          />
          <Square 
            value={board[7] || ""} 
            onClickSquare={() => onClickSquare(7)}
            winningSquare={winningPatter?.some(x => x === 7)}
          />
          <Square 
            value={board[8] || ""} 
            onClickSquare={() => onClickSquare(8)}
            winningSquare={winningPatter?.some(x => x === 8)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <h1>Welcome to Tik Tok Toe. Choose your name and press Start to play!</h1>
      <div>
        <form onSubmit={onClickStartGame} className="playersDiv">
          <div className="playerInput">
            <label>X: </label>
            <input type="text" id="playerone" value={playerOne?.name || ""} onChange={(e) => setPlayerOne({ name: e.target.value, letter: "X" })} maxLength={18} disabled={hasStartedGame} />
          </div>
          <div className="playerInput">
            <label>O: </label>
            <input type="text" id="playertwo" value={playerTwo?.name || ""} onChange={(e) => setPlayerTwo({ name: e.target.value, letter: "O" })} maxLength={18} disabled={hasStartedGame} />
          </div>
          <input className="buttons" type="submit" value="Start" onClick={onClickStartGame} />
        </form>
        <h3 className="instructions">{ currentPlayer.name ? `It's ${currentPlayer.name}'s turn` : 'X will go first'}</h3>
        {renderSquares()}
        <div className="playersDiv">
          <div className="aftermatchButtons">
            <input className="buttons" type="submit" value="New Game" onClick={onClickNewGame} disabled={isGameRunning || !hasStartedGame} />
            <input className="buttons" type="submit" value="Reset" onClick={onClickReset} disabled={!hasStartedGame} />
          </div>
          <label>Scores:</label>
          <label>{playerOne?.name} (X): {scores[playerOne.letter]}</label>
          <label>{playerTwo?.name} (X): {scores[playerTwo.letter]}</label>
          <label>Ties: {scores.ties}</label>
        </div>
      </div>
    </div>
  );
}

export default App;
