import { useState } from 'react';
import Square from './components/Square';

import './App.css';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);


  return (
    <div className="App">
      <div className="board">
        <div className="boardRow">
          <Square value={board[0] || ""} />
          <Square value={board[1] || ""} />
          <Square value={board[2] || ""} />
        </div>
        <div className="boardRow">
          <Square value={board[0] || ""} />
          <Square value={board[1] || ""} />
          <Square value={board[2] || ""} />
        </div>
        <div className="boardRow">
          <Square value={board[0] || ""} />
          <Square value={board[1] || ""} />
          <Square value={board[2] || ""} />
        </div>
      </div>
    </div>
  );
}

export default App;
