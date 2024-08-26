import React from 'react';
import './board.css'; // Import CSS specific to the board

function Cell({ value, isMyBoard, onClick }) {
  return (
    <div
      className={`cell ${isMyBoard ? 'my-board' : value.hit ? (value.ship ? 'hit-ship' : 'miss') : 'enemy-board'}`}
      onClick={onClick}
    >
      {isMyBoard && value.ship && value.hit ? '🚢' : ''}
      {!isMyBoard && value.hit && (value.ship ? '💥' : '💦')}
    </div>
  );
}

export default Cell;
