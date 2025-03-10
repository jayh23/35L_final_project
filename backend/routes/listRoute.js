import express from 'express';

import requireAuth from '../middleware/requireAuth.js';
import { getLists, getList, createList, addGameToList, removeGameFromList, deleteList } from '../controllers/listController.js';

const router = express.Router();

// GET all lists.
router.get('/:username', getLists);

// GET a list.
router.get('/:id', getList);

// POST a new list.
router.post('/', requireAuth, createList);

// PATCH (add a game to) a list.
router.patch('/add/:id', requireAuth, addGameToList);

// PATCH (remove a game from) a list.
router.patch('/remove/:id', requireAuth, removeGameFromList);

// DELETE a list.
router.delete('/:id', requireAuth, deleteList);

export default router;