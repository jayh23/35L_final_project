import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    gameId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    gamename: {
        type: String,
        required: true
    },
    gameimage: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    text: {
        type: String,
    },
    privacy: {
        type: Boolean,
        required: true
    }
 }, { timestamps: true });

 const Review = mongoose.model('Review', reviewSchema);

 export default Review;