import express from 'express';

import requireAuth from '../middleware/requireAuth.js';
import { getReviews, getOneUserReviews, createReview, updateReview, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

// Protect all review routes with authentication middleware.
router.use(requireAuth);

// GET all reviews.
router.get('/all', getReviews);

// GET all reviews for a specific user.
router.get('/user', getOneUserReviews);

// POST a new review.
router.post('/', createReview);

// PATCH (update) a review.
router.patch('/:id', updateReview);

// DELETE a review.
router.delete('/:id', deleteReview);

export default router;