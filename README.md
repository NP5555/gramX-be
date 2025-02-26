# GRAMXRO App Backend

## Overview
This backend is a RESTful API built with Node.js and Express.js to support a token sale platform. It manages users, token batches, leaderboard rankings, and tasks for earning rewards. The API integrates with a mobile frontend application running on `http://localhost:8081`.

## Features
- **User Management**: Retrieve user details and balances.
- **Token Sale**: View and purchase tokens from available batches.
- **Leaderboard**: Track top users based on tokens and shares.
- **Task System**: Earn tokens by completing predefined tasks.

## Project Structure
- **Server File**: `server.js` (contains all backend logic).
- **Dependencies**:
  - `express`: Web framework for Node.js.
  - `cors`: Middleware for handling CORS requests.
- **Dummy Data**:
  - Users
  - Token Batches
  - Leaderboard
  - Tasks

## Installation
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. **Install Dependencies**:
   ```bash
   npm install express cors
   ```
3. **Run the Server**:
   ```bash
   node server.js
   ```
   - The server runs on `http://localhost:3001`.

## API Endpoints

### 1. Get User by ID
- **Endpoint**: `GET /user/:id`
- **Response**:
  - **200**: `{ id, name, referralCode, tokens, shares, profileImage }`
  - **404**: `{ message: "User not found" }`

### 2. Get Current Token Batch
- **Endpoint**: `GET /batch/current`
- **Response**:
  - **200**: `{ batchNumber, currentPrice, nextPrice, tokensSold, totalTokens }`

### 3. Get Leaderboard
- **Endpoint**: `GET /leaderboard`
- **Response**:
  - **200**: `[ { userId, name, coins, shares }, ... ]`

### 4. Purchase Tokens
- **Endpoint**: `POST /tokens/purchase`
- **Request Body**:
  ```json
  { "userId": 1, "amount": 100 }
  ```
- **Response**:
  - **200**: `{ success: true, newBalance: number }`
  - **400**: `{ message: "Invalid purchase" }`

### 5. Complete Task
- **Endpoint**: `POST /tasks/complete`
- **Request Body**:
  ```json
  { "userId": 1, "task": "Join Our Telegram Community" }
  ```
- **Response**:
  - **200**: `{ success: true, newBalance: number }`
  - **400**: `{ message: "Invalid task or user" }`

## Configuration
- **Port**: `3001`
- **CORS**: Allows requests from `http://localhost:8081`

## Usage with Frontend
The backend integrates with a mobile frontend (built with Expo, React Native, and NativeWind). Screens include:
- **Leaderboard** (`GET /leaderboard`)
- **Earn More Coins** (`GET /tasks` and `POST /tasks/complete`)
- **User Dashboard** (`GET /user/:id`)
- **Token Purchase** (`GET /batch/current` and `POST /tokens/purchase`)

## Development Notes
- Basic logging and error handling included.
- Replace dummy data with a database (e.g., MongoDB) for production.

## Contributing
1. Fork the repository.
2. Make changes and add tests if applicable.
3. Submit a pull request.

## License
This project is licensed under the MIT License.
