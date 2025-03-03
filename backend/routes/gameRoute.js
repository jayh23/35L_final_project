import express from 'express';

// Controller functions.
import { getGames } from '../controllers/gameController.js';

const router = express.Router();

// GET all games.
router.get('/', getGames);

export default router;