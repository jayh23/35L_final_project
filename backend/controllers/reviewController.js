import mongoose from 'mongoose';

import Review from '../models/reviewModel.js';
import User from '../models/userModel.js';

// Get all reviews, sorted by newest.

// Get all reviews for a specific user.
export const getOneUserReviews = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        // Find reviews associated with the current user.
        const reviews = await Review.find({ userId: user._id }).sort({ createdAt: -1 });

        res.status(200).json({ data: reviews });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get all reviews, sorted by newest.
export const getReviews = async (req, res) => {
    const { gameid, userid } = req.query;
    const query = {};
    if (gameid) query.gameid = gameid;
    if (userid) query.userid = userid;
    
    try {
        const reviews = await Review.find({}).sort({ createdAt: -1 });

        res.status(200).json({ data: reviews });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new review.
export const createReview = async (req, res) => {
    const review = req.body; // user will send this data

    if (!review.rating) {
        return res.status(400).json({ message: "Please provide a rating." });
    }

    // Add review to database.
    try {
        const newReview = await Review.create(review);

        res.status(200).json({ data: newReview });
    } catch (error) {
        console.error("Error in creating review:", error.message);
        res.status(500).json({ error: "Server Error" });
    }
};

// Update a review.
export const updateReview = async (req, res) => {
    const { id } = req.params;

    const review = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid review id." });
    }

    try {
        const updatedReview = await Review.findByIdAndUpdate({ _id: id }, review);

        res.status(200).json({ data: updatedReview });
    } catch (error) {
        console.error("Error in updating review:", error.message);
        res.status(500).json({ error: "Server Error" });
    }
};

// Delete a review.
export const deleteReview = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid review id." });
    }

    try {
        const deletedReview = await Review.findByIdAndDelete({ _id: id });

        res.status(200).json({ data: deletedReview });
    } catch (error) {
        console.error("Error in deleting review:", error.message);
        res.status(500).json({ error: "Server Error" });

    }

};