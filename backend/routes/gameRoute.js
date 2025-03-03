import express from 'express';

// Controller functions.
import { getGames } from '../controllers/gameController.js';

const router = express.Router();

// Get all games.
router.get('/', getGames);

// Get a single game.
//router.get('/:id', getGame);

export default router;