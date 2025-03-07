import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    gameid: {
        type: String,
        required: true
    },
    userid: {
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
    },
    likes: {
        type: [String],
        required: true
    }
 }, { timestamps: true });

 const Review = mongoose.model('Review', reviewSchema);

 export default Review;