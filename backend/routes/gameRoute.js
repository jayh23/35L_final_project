import express from 'express';

// Controller functions.
import { getGames, searchGames } from '../controllers/gameController.js';

const router = express.Router();

// GET all games.
router.get('/', getGames);

app.get('/api/search', searchGames);

export default router;