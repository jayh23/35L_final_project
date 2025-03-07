import express from 'express';

import { searchGames } from '../controllers/gameController.js';

const router = express.Router();

router.get('/search', searchGames);

export default router;