import express from 'express';

// Controller functions.
import { getGames, getGameById } from '../controllers/gameController.js';

const router = express.Router();

// GET all games.
router.get('/', getGames);
router.get('/:id', getGameById);

export default router;