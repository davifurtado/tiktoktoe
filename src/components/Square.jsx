import React from "react";
import "./square.css";


function Square({ value, onClickSquare, winningSquare }) {
  return (
    <div className={winningSquare ? "winningSquare" : "square"} onClick={onClickSquare}>
      {value}
    </div>
  );
}

export default Square;
