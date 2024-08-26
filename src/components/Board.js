import React from 'react';

function Board({ board, isMyBoard, onAttack }) {
  const handleCellClick = (row, col) => {
    if (!isMyBoard && onAttack) {
      onAttack(row, col);
    }
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${cell.ship ? 'ship' : ''} ${cell.hit ? 'hit' : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell.hit && (cell.ship ? 'X' : 'O')}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
