import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    userid: String,
    games: [String],
    title: String,
    privacy: Boolean,
    type: Number // 0 owned, 1 favorites, 2 custom
 })

 const List = mongoose.model('List', listSchema);

 export default List;