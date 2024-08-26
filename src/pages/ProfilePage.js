import React, { useState, useEffect } from 'react';
import { fetchUserProfile, createGame } from '../services/api';
import NewGameButton from '../components/NewGameButton';
import GameHistoryDropdown from '../components/GameHistoryDropdown';
import { useHistory } from 'react-router-dom';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) throw new Error('User not logged in');

        const data = await fetchUserProfile(user.id); // Assuming user ID is stored
        setUserData(data);
      } catch (error) {
        alert('Failed to load user data.');
      }
    };

    getUserData();
  }, []);

  const handleNewGame = async () => {
    try {
      const newGame = await createGame(userData.username, 'Player 2');
      history.push(`/game/${newGame.id}`);
    } catch (error) {
      alert('Failed to start a new game.');
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="profile-page container">
      <h1 className="text-center">Welcome, {userData.username}</h1>
      <NewGameButton onClick={handleNewGame} />
      <GameHistoryDropdown games={userData.games} />
    </div>
  );
}

export default ProfilePage;
