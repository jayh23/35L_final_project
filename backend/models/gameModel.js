import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },

    sumscore: {
        type: float,
        default: 0,
        required: true
    },

    numreviews: {
        type: int,
        default: 0,
        required: true
    }
 })

 const Game = mongoose.model('Game', gameSchema);

 export default Game;

 