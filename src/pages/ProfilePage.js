import React, { useState, useEffect } from 'react';
import { fetchUserProfile, createGame } from '../services/api';
import NewGameButton from '../components/NewGameButton';
import GameHistoryDropdown from '../components/GameHistoryDropdown';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

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
      navigate(`/game/${newGame.id}`);
    } catch (error) {
      alert('Failed to start a new game.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login page after logout
  };

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/profile'); 
  };

  return userData ? (
    <div className="profile-page container">
      <h1 className="text-center">Welcome, {userData.username}</h1>
      <NewGameButton onClick={handleNewGame} />
      <GameHistoryDropdown games={userData.games} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <div>
      <h2>Please login</h2>
      <LoginForm onSubmit={handleLoginSuccess} />
    </div>
  );
}

export default ProfilePage;