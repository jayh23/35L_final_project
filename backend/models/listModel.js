import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    games: [String],
    privacy: {
        type: Boolean,
        //required: true
    },
    category: {
        type: String, // 0 owned, 1 favorites, 2 custom
        required: true
        //unique: true
    },
 });

 //Ensure uniqueness of `category` per `userId`
listSchema.index({ userId: 1, category: 1 }, { unique: true });

 const List = mongoose.model('List', listSchema);


 export default List;