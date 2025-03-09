import express from 'express';

import requireAuth from '../middleware/requireAuth.js';
import { getReviews, createReview, updateReview, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

// Protect all review routes with authentication middleware.
router.use(requireAuth);

// GET all reviews.
router.get('/', getReviews);

// POST a new review.
router.post('/', createReview);

// PATCH (update) a review.
router.patch('/:id', updateReview);

// DELETE a review.
router.delete('/:id', deleteReview);

export default router;