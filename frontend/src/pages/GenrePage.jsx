// src/pages/GenrePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../styles/GenrePage.css";  // Create a dedicated CSS file if desired

const GenrePage = () => {
  const { genreName } = useParams();  // expecting a route like /genre/:genreName
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGamesByGenre = async () => {
      try {
        const response = await fetch(`/api/games/genre/${encodeURIComponent(genreName)}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch games');
        }
        setGames(data.data || data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGamesByGenre();
  }, [genreName]);

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div className="genre-page">
      <h2>Genre: {genreName}</h2>
      <div className="game-grid">
        {games.length > 0 ? (
          games.map((game) => (
            <Link key={game._id} to={`/games/${game._id}`} className="game-card">
              <img src={game.image} alt={game.title} />
              <p>{game.title}</p>
            </Link>
          ))
        ) : (
          <p>No games found for this genre.</p>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
