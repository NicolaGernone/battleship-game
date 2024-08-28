const API_URL = process.env.REACT_APP_API_URL;

// -------------------------------------
// User Authentication Endpoints
// -------------------------------------

/**
 * Logs in a user.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Object} The response from the server, typically containing a token.
 */
export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/users/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

    },
    body: JSON.stringify({ username, password }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to log in');
  }

  return response.json();
};

// -------------------------------------
// User Management Endpoints
// -------------------------------------

/**
 * Creates a new user.
 * @param {string} username - The username of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Object} The response from the server.
 */
export const createUser = async (username, password) => {
  const response = await fetch(`${API_URL}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return response.json();
};

/**
 * Fetches the user profile.
 * @param {number} user_id - The ID of the user.
 * @returns {Object} user profile.
 */
export const fetchUserProfile = async (user) => {
  const response = await fetch(`${API_URL}/users/${user.user.id}/`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  if (!response.ok) {
      throw new Error('Failed to fetch user profile');
  }

  return response.json();
};

// -------------------------------------
// Game Management Endpoints
// -------------------------------------

/**
 * Creates a new game.
 * @param {string} player1 - Username of player 1.
 * @param {string} player2 - Username of player 2.
 * @returns {Object} The response from the server.
 */
export const createGame = async (player1, player2, token) => {
  const response = await fetch(`${API_URL}/gameplays/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ player1, player2 }),
  });

  if (!response.ok) {
    throw new Error('Failed to create game');
  }

  return response.json();
};

/**
 * Fetches the list of all games.
 * @returns {Array} List of games.
 */
export const fetchGames = async (token) => {
  const response = await fetch(`${API_URL}/gameplays/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }

  return response.json();
};

// -------------------------------------
// Gameplay Endpoints
// -------------------------------------

/**
 * Submits ship positions for a game.
 * @param {number} gameId - The ID of the game.
 * @param {Object} shipPositions - The positions of the ships.
 * @returns {Object} The response from the server.
 */
export const submitShipPositions = async (gameId, shipPositions, token) => {
  const response = await fetch(`${API_URL}/gameplays/${gameId}/position-ships/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ shipPositions }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit ship positions');
  }

  return response.json();
};

/**
 * Makes an attack on the opponent's board.
 * @param {number} gameId - The ID of the game.
 * @param {number} row - The row number to attack.
 * @param {number} col - The column number to attack.
 * @returns {Object} The response from the server, indicating hit/miss and the updated board state.
 */
export const makeAttack = async (gameId, row, col, token) => {
  const response = await fetch(`${API_URL}/gameplays/${gameId}/attack/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ row, col }),
  });

  if (!response.ok) {
    throw new Error('Failed to make attack');
  }

  return response.json();
};

/**
 * Fetches the current state of a game.
 * @param {number} gameId - The ID of the game.
 * @returns {Object} The current game state.
 */
export const fetchGameState = async (gameId, token) => {
  const response = await fetch(`${API_URL}/games/${gameId}/state/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch game state');
  }

  return response.json();
};
