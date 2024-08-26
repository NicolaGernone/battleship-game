import React, { useState, useEffect } from 'react';
import { fetchGameState, makeAttack } from '../services/api';
import Board from '../components/Board';
import ShipPlacement from '../components/ShipPlacement';

function GamePage({ match }) {
  const gameId = match.params.gameId;
  const [gameState, setGameState] = useState(null);
  const [playerBoard, setPlayerBoard] = useState(createEmptyBoard());
  const [opponentBoard, setOpponentBoard] = useState(createEmptyBoard());
  const [shipsPlaced, setShipsPlaced] = useState(false);

  useEffect(() => {
    const loadGameState = async () => {
      try {
        const state = await fetchGameState(gameId);
        setGameState(state);
        setPlayerBoard(state.playerBoard);
        setOpponentBoard(state.opponentBoard);
      } catch (error) {
        alert('Failed to load game state.');
      }
    };

    loadGameState();
  }, [gameId]);

  const handlePositionShips = (positions) => {
    setPlayerBoard(placeShipsOnBoard(playerBoard, positions));
    setShipsPlaced(true);
  };

  const handleStartGame = () => {
    // Additional logic if needed to start the game
    setShipsPlaced(true);
  };

  const handleAttack = async (row, col) => {
    if (!shipsPlaced) {
      alert('Place all ships before starting the game!');
      return;
    }

    try {
      const result = await makeAttack(gameId, row, col);
      setOpponentBoard(result.opponentBoard);
      setPlayerBoard(result.playerBoard); // Update player board if needed
    } catch (error) {
      alert('Failed to make the attack.');
    }
  };

  return (
    <div className="game-page container">
      {!shipsPlaced ? (
        <ShipPlacement gameId={gameId} onStartGame={handleStartGame} />
      ) : (
        <>
          <h2>Your Board</h2>
          <Board board={playerBoard} isMyBoard={true} />
          <h2>Opponent's Board</h2>
          <Board board={opponentBoard} isMyBoard={false} onAttack={handleAttack} />
        </>
      )}
    </div>
  );
}

function createEmptyBoard() {
  return Array(10).fill(null).map(() => Array(10).fill({ ship: false, hit: false }));
}

function placeShipsOnBoard(board, positions) {
  // Implement logic to update the board with the ships
  return board;
}

export default GamePage;
