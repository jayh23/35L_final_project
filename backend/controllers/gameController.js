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

export const searchGames = async (req, res) => {
    const query = req.query.q;
    try {
        const results = await Game.find({
            title: { $regex: query, $options: 'i' },
        });
        res.status(200).json({ data: results });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: error.message });
    }
};