import React from 'react';
import { useNavigate } from 'react-router-dom';

function GameHistoryDropdown({ games }) {
  const navigate = useNavigate();

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Game History
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {games && games.map(game => (
          <li key={game.id}>
            <button className="dropdown-item" onClick={() => navigate(`/game/${game.id}`)}>
              Game {game.id} - {game.result}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameHistoryDropdown;
