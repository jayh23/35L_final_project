import express from 'express';

// Controller functions.
import { getGames, getGameById, searchGames, getGamesByGenre } from '../controllers/gameController.js';


const router = express.Router();

// GET all games.
router.get('/', getGames);
router.get('/search', searchGames);
router.get('/genre/:genre', getGamesByGenre);
router.get('/:id', getGameById);



export default router;