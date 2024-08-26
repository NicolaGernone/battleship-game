import React from 'react';
import Cell from '../components/Cell';
import './board.css';

function Board({ board, isMyBoard, onAttack }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              value={cell}
              isMyBoard={isMyBoard}
              onClick={() => !isMyBoard && onAttack(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
