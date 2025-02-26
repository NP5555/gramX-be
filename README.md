Provided Express.js backend code, tailored to explain its purpose, setup, usage, and integration with the frontend application shown in the attached images. This README is designed to be developer-friendly, providing all necessary details to understand, run, and contribute to the project.

```markdown
# Token Sale Application Backend

## Overview
This backend application is a RESTful API built with Node.js and Express.js, designed to support a token sale platform. It manages user data, token batches, leaderboard rankings, and tasks for earning rewards. The API integrates with a frontend mobile application running on `http://localhost:8081`, as indicated by the CORS configuration and screenshots provided.

## Project Structure
- **Codebase**: Contained in a single file, `server.js`.
- **Dependencies**:
  - `express`: Web framework for Node.js.
  - `cors`: Middleware for enabling Cross-Origin Resource Sharing.
- **Data Models**: Dummy datasets for:
  - Users (`dummyUsers`)
  - Token Batches (`dummyBatches`)
  - Leaderboard (`dummyLeaderboard`)
  - Tasks (`dummyTasks`)
- **API Endpoints**: Routes for user details, batch information, leaderboard data, token purchases, and task completions.
- **Server Configuration**: Runs on port `3001` with CORS enabled for `http://localhost:8081`.

## Installation
Follow these steps to set up and run the backend locally:

1. **Clone the Repository or Create a Directory**:
   - If cloning from a repository:
     ```bash
     git clone <repository-url>
     cd <repository-directory>
     ```
   - Alternatively, create a new directory and save the provided code as `server.js`.

2. **Install Dependencies**:
   - Ensure Node.js is installed, then run:
     ```bash
     npm init -y
     npm install express cors
     ```

3. **Run the Server**:
   - Start the server with:
     ```bash
     node server.js
     ```
   - The server will be accessible at `http://localhost:3001`.

## Configuration
- **Port**: The server listens on `PORT = 3001`.
- **CORS**: Configured to allow requests from `http://localhost:8081`, matching the frontend URL in the screenshots.

## Dummy Data
The application uses predefined dummy data for development and testing:

### Users (`dummyUsers`)
- **John Doe** (ID: 1):
  - Name: "John Doe"
  - Referral Code: "3UEQQS1"
  - Tokens: 1000
  - Shares: 50
  - Profile Image: "path/to/image.jpg"
- **Julio** (ID: 2):
  - Tokens: 6493.25
  - Shares: 2874
- **Sarah K.** (ID: 3):
  - Tokens: 5526
  - Shares: 2456

### Batches (`dummyBatches`)
- **Batch #9**:
  - Current Price: $1.38
  - Next Price: $1.45
  - Tokens Sold: 76,779
  - Total Tokens: 100,000
- **Batch #10**:
  - Current Price: $1.45
  - Next Price: $1.52
  - Tokens Sold: 0
  - Total Tokens: 100,000

### Leaderboard (`dummyLeaderboard`)
- **Julio** (User ID: 2):
  - Coins: 6493.25
  - Shares: 2874
- **Sarah K.** (User ID: 3):
  - Coins: 5526
  - Shares: 2456
- **Alex M.** (User ID: 4):
  - Coins: 4945.5
  - Shares: 2198

### Tasks (`dummyTasks`)
- **Join Our Telegram Community**: Reward: 0.25 tokens
- **Follow on Instagram**: Reward: 0.25 tokens
- **Subscribe on YouTube**: Reward: 0.25 tokens
- **Follow on Twitter**: Reward: 0.25 tokens

## API Endpoints
The API provides the following endpoints:

### 1. Get User by ID
- **Endpoint**: `GET /user/:id`
- **Description**: Retrieves a user's details by their ID.
- **Parameters**: `id` (integer)
- **Response**:
  - **200**: User object `{ id, name, referralCode, tokens, shares, profileImage }`
  - **404**: `{ message: "User not found" }`
- **Example**: `GET /user/1` returns John Doe's data.

### 2. Get Current Batch
- **Endpoint**: `GET /batch/current`
- **Description**: Returns details of the current token batch (Batch #9).
- **Response**:
  - **200**: Batch object `{ batchNumber, currentPrice, nextPrice, tokensSold, totalTokens }`
- **Example**: Returns `{ batchNumber: 9, currentPrice: 1.38, nextPrice: 1.45, tokensSold: 76779, totalTokens: 100000 }`.

### 3. Get Leaderboard
- **Endpoint**: `GET /leaderboard`
- **Description**: Returns the leaderboard rankings based on coins and shares.
- **Response**:
  - **200**: Array of objects `[ { userId, name, coins, shares }, ... ]`
- **Example**: Returns the top performers as shown in the "Leaderboard" screenshot.

### 4. Purchase Tokens
- **Endpoint**: `POST /tokens/purchase`
- **Description**: Allows a user to purchase tokens with a minimum amount of $100.
- **Request Body**: `{ userId: integer, amount: number }`
- **Response**:
  - **200**: `{ success: true, newBalance: number }`
  - **400**: `{ message: "Invalid purchase" }`
- **Example**: `POST /tokens/purchase` with `{ userId: 1, amount: 1000 }` adds ~724.64 tokens (at $1.38/token) to John Doe’s balance.

### 5. Complete Task
- **Endpoint**: `POST /tasks/complete`
- **Description**: Allows a user to complete a task and earn tokens and shares.
- **Request Body**: `{ userId: integer, task: string }`
- **Response**:
  - **200**: `{ success: true, newBalance: number }`
  - **400**: `{ message: "Invalid task or user" }`
- **Example**: `POST /tasks/complete` with `{ userId: 1, task: "Join Our Telegram Community" }` adds 0.25 tokens and 1 share to the user.

## Usage
### Frontend Integration
The backend supports a mobile frontend application (built with Expo, React Native, and NativeWind, as per the directory structure). Screenshots show it running on `http://localhost:8081`:

- **Leaderboard Screen**:
  - Displays top performers (e.g., Julio with 6493.25 coins, 2874 shares) with rewards for 1st (25,000), 2nd (15,000), and 3rd (10,000).
  - Matches `GET /leaderboard` data.

- **Earn More Coins Screen**:
  - Lists tasks (e.g., "Join Our Telegram Community" for 0.25 coins) from `dummyTasks`.
  - Supports `POST /tasks/complete` for earning rewards.

- **Additional Frontend Context** (from other screenshots):
  - User dashboard welcomes "John Doe" with referral code "3UEQQS1" (`GET /user/1`).
  - Token purchase screen shows Batch #9 at $1.38 and next price $1.45 (`GET /batch/current`), with a $1000 purchase option (`POST /tokens/purchase`).

### Key Features
- **Token Purchasing**: Dynamic pricing with batch progression.
- **Reward System**: Earn tokens and shares via tasks and referrals.
- **Leaderboard**: Tracks user engagement and performance.
- **CORS Support**: Seamless integration with the frontend at `http://localhost:8081`.

## Development Notes
- **Logging**: Console logs track requests and responses for debugging (e.g., `GET /user/1 requested`).
- **Error Handling**: Basic checks for invalid users, purchases, and tasks.
- **Scalability**: Replace dummy data with a database (e.g., MongoDB) for production use.

## Contributing
Contributions are encouraged! To contribute:
1. Fork the repository.
2. Make changes and add tests if applicable.
3. Submit a pull request with a clear description of your updates.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details (noted in the directory structure as added with commit "Added MIT License").

## Contact
For questions, issues, or support, please open an issue on the repository or contact [Your Name/Email].
```

### Explanation
This `README.md` is a complete, standalone guide for the Express.js backend:
- **Structure**: Organized into clear sections for easy navigation.
- **Integration**: Ties the backend to the frontend via CORS, dummy data, and screenshot references (e.g., leaderboard and tasks).
- **Details**: Includes precise API documentation, installation steps, and dummy data matching the code and screenshots.
- **Context**: Incorporates the mobile app context from the directory listing (Expo, React Native) and screenshots, enhancing relevance.
- **Markdown**: Used extensively for readability with headers, lists, code blocks, and bold/italic emphasis.

This README ensures developers can quickly set up, understand, and extend the project while aligning with the provided code and image descriptions.
