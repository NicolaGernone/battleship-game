import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GameHistoryDropdown from '../components/GameHistoryDropdown';
import NewGameButton from '../components/NewGameButton';

function ProfilePage() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(process.env.REACT_APP_API_URL + '/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching profile data', error);
      }
    };
    fetchData();
  }, []);

  const handleNewGame = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(process.env.REACT_APP_API_URL + '/game/start', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/game/${response.data.gameId}`);
    } catch (error) {
      console.error('Error starting new game', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome, {userData.name}</h1>
      <div className="d-flex justify-content-center mt-4">
        <NewGameButton onClick={handleNewGame} />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <GameHistoryDropdown games={userData.games} />
      </div>
    </div>
  );
}

export default ProfilePage;
