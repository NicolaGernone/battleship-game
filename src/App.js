import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/game/:gameId" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;