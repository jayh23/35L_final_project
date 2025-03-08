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


export const getGameById = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json({ data: game });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


