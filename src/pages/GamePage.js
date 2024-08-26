import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Board from '../components/Board';

function GamePage({ match }) {
  const { id } = match.params;
  const [gameData, setGameData] = useState({});
  const [myBoard, setMyBoard] = useState([]);
  const [opponentBoard, setOpponentBoard] = useState([]);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/game/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGameData(response.data);
        setMyBoard(response.data.myBoard);
        setOpponentBoard(response.data.opponentBoard);
      } catch (error) {
        console.error('Error fetching game data', error);
      }
    };
    fetchGameData();
  }, [id]);

  const handleAttack = async (x, y) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/game/${id}/attack`, { x, y }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Handle game state update based on response
      if (response.data.hit) {
        // Trigger success animation
      } else {
        // Trigger miss animation
      }
    } catch (error) {
      console.error('Error making attack', error);
    }
  };

  return (
    <div>
      <h1>Game ID: {id}</h1>
      <Board board={myBoard} isMyBoard={true} />
      <Board board={opponentBoard} isMyBoard={false} onAttack={handleAttack} />
    </div>
  );
}

export default GamePage;
