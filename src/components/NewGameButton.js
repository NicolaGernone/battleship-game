import React from 'react';

function NewGameButton({ onClick }) {
    return (
        <button className="btn btn-success btn-lg" onClick={onClick}>
          <i className="bi bi-controller"></i> Start New Game
        </button>
      );
}

export default NewGameButton;
