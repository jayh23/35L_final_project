import express from 'express';

import requireAuth from '../middleware/requireAuth.js';
import { getLists, getList, createList, addGameToList, removeGameFromList, deleteList } from '../controllers/listController.js';

const router = express.Router();

// Protect all list routes with authentication middleware.
router.use(requireAuth);

// GET all lists.
router.get('/', getLists);

// GET a list.
router.get('/:id', getList);

// POST a new list.
router.post('/', createList);

// PATCH (add a game to) a list.
router.patch('/add/:id', addGameToList);

// PATCH (remove a game from) a list.
router.patch('/remove/:id', removeGameFromList);

// DELETE a list.
router.delete('/:id', deleteList);

export default router;