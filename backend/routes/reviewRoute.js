import express from 'express';

import requireAuth from '../middleware/requireAuth.js';
import { getReviews, getOneUserReviews, createReview, updateReview, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

// GET all reviews.
router.get('/', getReviews);

// GET all reviews for a specific user.
router.get('/:username', getOneUserReviews);

// POST a new review.
router.post('/', requireAuth, createReview);

// PATCH (update) a review.
router.patch('/:id', requireAuth, updateReview);

// DELETE a review.
router.delete('/:id', requireAuth, deleteReview);

export default router;