import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    title: String,
    year: Number,
    image: String,
    genre: [String]
 })

 const Game = mongoose.model('Game', gameSchema);

 export default Game;
 