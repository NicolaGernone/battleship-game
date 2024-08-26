import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/game/:gameId" component={GamePage} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
