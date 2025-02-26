const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies and enable CORS
app.use(cors());
app.use(express.json());

app.use(cors({ origin: 'http://localhost:8081' }))

// Dummy data
const dummyUsers = [
  { id: 1, name: "John Doe", referralCode: "3UEQQS1", tokens: 1000, shares: 50, profileImage: "path/to/image.jpg" },
  { id: 2, name: "Julio", tokens: 6493.25, shares: 2874 },
  { id: 3, name: "Sarah K.", tokens: 5526, shares: 2456 },
];

const dummyBatches = [
  { batchNumber: 9, currentPrice: 1.38, nextPrice: 1.45, tokensSold: 76779, totalTokens: 100000 },
  { batchNumber: 10, currentPrice: 1.45, nextPrice: 1.52, tokensSold: 0, totalTokens: 100000 },
];

const dummyLeaderboard = [
  { userId: 2, name: "Julio", coins: 6493.25, shares: 2874 },
  { userId: 3, name: "Sarah K.", coins: 5526, shares: 2456 },
  { userId: 4, name: "Alex M.", coins: 4945.5, shares: 2198 },
];

const dummyTasks = [
  { task: "Join Our Telegram Community", reward: 0.25 },
  { task: "Follow on Instagram", reward: 0.25 },
  { task: "Subscribe on YouTube", reward: 0.25 },
  { task: "Follow on Twitter", reward: 0.25 },
];

// API Endpoints
app.get('/user/:id', (req, res) => {
  console.log(`GET /user/${req.params.id} requested`);
  const user = dummyUsers.find(u => u.id === parseInt(req.params.id));
  if (user) {
    console.log('User found:', user);
    res.json(user);
  } else {
    console.log('User not found');
    res.status(404).json({ message: "User not found" });
  }
});

app.get('/batch/current', (req, res) => {
  console.log('GET /batch/current requested');
  console.log('Current batch:', dummyBatches[0]);
  res.json(dummyBatches[0]);
});

app.get('/leaderboard', (req, res) => {
  console.log('GET /leaderboard requested');
  console.log('Sending leaderboard data:', dummyLeaderboard);
  res.json(dummyLeaderboard);
});

app.post('/tokens/purchase', (req, res) => {
  console.log('POST /tokens/purchase requested', req.body);
  const { userId, amount } = req.body;
  const user = dummyUsers.find(u => u.id === userId);
  if (user && amount >= 100) {
    const tokensToAdd = amount / dummyBatches[0].currentPrice;
    console.log(`Adding ${tokensToAdd} tokens to user ${userId}`);
    user.tokens += tokensToAdd;
    dummyBatches[0].tokensSold += tokensToAdd;
    res.json({ success: true, newBalance: user.tokens });
  } else {
    console.log('Invalid purchase attempt');
    res.status(400).json({ message: "Invalid purchase" });
  }
});

app.post('/tasks/complete', (req, res) => {
  console.log('POST /tasks/complete requested', req.body);
  const { userId, task } = req.body;
  const user = dummyUsers.find(u => u.id === userId);
  const taskData = dummyTasks.find(t => t.task === task);
  if (user && taskData) {
    console.log(`User ${userId} completed task: ${task}`);
    user.tokens += taskData.reward;
    user.shares += 1;
    res.json({ success: true, newBalance: user.tokens });
  } else {
    console.log('Invalid task completion attempt');
    res.status(400).json({ message: "Invalid task or user" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});