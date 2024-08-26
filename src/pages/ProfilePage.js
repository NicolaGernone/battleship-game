import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from '../services/api';
import NewGameButton from '../components/NewGameButton';
import GameHistoryDropdown from '../components/GameHistoryDropdown';
import { useHistory } from 'react-router-dom';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function getUserData() {
      const data = await fetchUserProfile();
      setUserData(data);
    }
    getUserData();
  }, []);

  const handleNewGame = () => {
    history.push('/game/new');
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="profile-page container">
      <h1 className="text-center">Welcome, {userData.name}</h1>
      <NewGameButton onClick={handleNewGame} />
      <GameHistoryDropdown games={userData.games} />
    </div>
  );
}

export default ProfilePage;
