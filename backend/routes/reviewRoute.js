import express from 'express';

// Controller functions.
import { getReviews, createReview, updateReview, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

// GET all reviews.
router.get('/', getReviews);

// POST a new review.
router.post('/', createReview);

// PATCH (update) a review.
router.patch('/:id', updateReview);

// DELETE a review.
router.delete('/:id', deleteReview);

export default router;