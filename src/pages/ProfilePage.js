import React, { useState, useEffect } from 'react';
import { fetchUserProfile, fetchGames, createGame } from '../services/api';
import NewGameButton from '../components/NewGameButton';
import GameHistoryDropdown from '../components/GameHistoryDropdown';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import '../styles/profile.css';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [gameplays, setGameplays] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) throw new Error('User not logged in');

        const userProfileData = await fetchUserProfile(user);
        setUserData(userProfileData);

        const gameplayData = await fetchGames();
        setGameplays(gameplayData);
      } catch (error) {
        alert('Failed to load user data or game history.');
      }
    };

    getUserData();
  }, []);

  const handleNewGame = async () => {
    try {
      const newGame = await createGame(userData.username, 'Player_2_auto');
      navigate(`/game/${newGame.id}`);
    } catch (error) {
      alert('Failed to start a new game.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login'); 
  };

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/profile');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const calculateWinsLosses = () => {
    if (!gameplays.length) return { wins: 0, losses: 0 };
    // Calculate wins and losses based on gameplay data (assuming a `winner` property)
    const wins = gameplays.filter((g) => g.winner === userData.username).length;
    const losses = gameplays.length - wins;
    return { wins, losses };
  };

  const winsLosses = calculateWinsLosses();

  return userData ? (
    <div className="profile-page container">
      <h1 className="text-center">Welcome, {userData.username}</h1>
      <NewGameButton onClick={handleNewGame} />
      <div className="game-stats">
        <p>Wins: {winsLosses.wins}</p>
        <p>Losses: {winsLosses.losses}</p>
      </div>
      <div className="game-history">
        <button onClick={toggleDropdown}>Game History ({gameplays.length})</button>
        {isDropdownOpen && (
          <GameHistoryDropdown games={gameplays} onClose={toggleDropdown} />
        )}
      </div>
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