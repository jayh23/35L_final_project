import Game from '../models/gameModel.js';

// Get all games.
export const getGames = async (req, res) => {
    try {
        const games = await Game.find({});
        res.status(200).json({ data: games });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

