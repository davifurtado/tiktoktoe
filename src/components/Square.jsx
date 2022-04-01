import React from "react";
import "./square.css";


function Square({ value, onClickSquare }) {
  return (
    <div className="square" onClick={onClickSquare}>
      {value}
    </div>
  );
}

export default Square;
