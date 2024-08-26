import React, { useState } from 'react';
import { submitShipPositions } from '../services/api';

function ShipPlacement({ gameId, onStartGame }) {
  const [positions, setPositions] = useState({
    carrier: [],
    battleship: [],
    cruiser: [],
    submarine: [],
    destroyer: [],
  });

  const handlePositionChange = (ship, newPosition) => {
    setPositions((prevPositions) => ({
      ...prevPositions,
      [ship]: newPosition,
    }));
  };

  const validatePositions = () => {
    // Implement validation logic to ensure ship positions are valid
    // e.g., no overlap, correct direction, within board boundaries.
    return true;
  };

  const handleSubmit = async () => {
    if (!validatePositions()) {
      alert('Invalid ship positions. Please adjust your placements.');
      return;
    }

    try {
      await submitShipPositions(gameId, positions);
      onStartGame();
    } catch (error) {
      alert('Failed to submit ship positions.');
    }
  };

  return (
    <div className="ship-placement">
      <h2>Place Your Ships</h2>
      <div className="ship-list">
        {/* Implement ship placement UI, possibly using text inputs or drag-and-drop */}
        {Object.keys(positions).map((ship) => (
          <div key={ship} className="ship">
            <label>{ship.charAt(0).toUpperCase() + ship.slice(1)}:</label>
            <input
              type="text"
              value={positions[ship].join(', ')}
              onChange={(e) =>
                handlePositionChange(ship, e.target.value.split(', '))
              }
            />
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Start Game
      </button>
    </div>
  );
}

export default ShipPlacement;
