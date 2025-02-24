import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

// Middleware function that runs before you send response back to client
app.use(express.json()); // allows us to accept JSON data in the req.body

app.listen(process.env.PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + process.env.PORT);
});

// API Endpoints
app.get("/api/games/trending", async (req, res) => {
    try {
      const trendingGames = await Game.find().limit(10);
      res.json(trendingGames);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch trending games" });
    }
  });
  
  app.get("/api/games/popular-with-friends", async (req, res) => {
    try {
      const popularGames = await Game.find().limit(10);
      res.json(popularGames);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch popular games" });
    }
  });