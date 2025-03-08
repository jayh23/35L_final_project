import express from 'express';

// Controller functions.
import { getList, createList, updateList, deleteList } from '../controllers/listController.js';

const router = express.Router();

// GET a list.
router.get('/:id', getList);

// POST a new list.
router.post('/', createList);

// PATCH (update) a list.
router.patch('/:id', updateList);

// DELETE a list.
router.delete('/:id', deleteList);

export default router;