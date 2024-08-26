import React from 'react';

function Cell({ value, isMyBoard, onClick }) {
    const animationClass = value.hit
      ? value.ship
        ? 'animate__animated animate__shakeX'
        : 'animate__animated animate__bounceIn'
      : '';
  
      return (
        <div
          className={`p-2 border text-center ${isMyBoard ? 'bg-light' : value.hit ? (value.ship ? 'bg-danger ship-hit' : 'bg-info water-splash') : 'bg-primary'}`}
          style={{ width: '40px', height: '40px', cursor: isMyBoard ? 'default' : 'pointer' }}
          onClick={onClick}
        >
          {value.hit && isMyBoard ? '🚢' : ''}
        </div>
      );
  }
  

export default Cell;
