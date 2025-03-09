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
        type: Number,
        default: 0,
        required: true
    },

    numreviews: {
        type: Number,
        default: 0,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    trending: { 
        type: Boolean, default: false 
    },
    popular: { 
        type: Boolean, default: false 
    }

 })

 const Game = mongoose.model('Game', gameSchema);

 export default Game;

 