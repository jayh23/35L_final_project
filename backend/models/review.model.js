import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    gameid: String,
    userid: String,
    rating: Number,
    text: String,
    privacy: Boolean,
    likes: [String]
 })

 const Review = mongoose.model('Review', reviewSchema);

 export default Review;