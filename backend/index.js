// Example
import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors'; // <-- import cors

import { connectDB } from './config/db.js';
import Game from './models/game.model.js';


dotenv.config();
const app = express();

// Enable CORS for all requests
app.use(cors()); // <-- add this line
app.use(express.json());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hi");
});

// Routes
app.use('/api/user', userRoutes);

// Connect to database
app.listen(process.env.PORT, () => {
  connectDB();
  console.log('Server listening on port ' + process.env.PORT);
});

// Example route
app.get('/api/games', async (req, res) => {
  try {
    const allGames = await Game.find();
    return res.json(allGames);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
