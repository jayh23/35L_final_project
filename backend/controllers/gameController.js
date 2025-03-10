import Game from '../models/gameModel.js';

// Get all games, with optional filtering for trending or popular.
export const getGames = async (req, res) => {
  try {
    const filter = {};

    // If 'trending' is provided as a query parameter, convert it to a boolean.
    if (req.query.trending) {
      filter.trending = req.query.trending === "true";
    }

    // If 'popular' is provided as a query parameter, convert it to a boolean.
    if (req.query.popular) {
      filter.popular = req.query.popular === "true";
    }

    const games = await Game.find(filter);
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

export const searchGames = async (req, res) => {
    const { q } = req.query; // 'q' stands for the query string
    const query = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    // Perform a case-insensitive search on the "title" field
    const results = await Game.find({
      title: { $regex: query, $options: 'i' }
    });


    res.status(200).json({ data: results });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getGamesByGenre = async (req, res) => {
  const { genre } = req.params;
  try {
    // Find games whose 'genre' array contains the specified genre (case-insensitive)
    const games = await Game.find({ genre: { $regex: genre, $options: 'i' } });
    res.status(200).json({ data: games });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
