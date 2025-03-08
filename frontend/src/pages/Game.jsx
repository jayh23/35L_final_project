﻿import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Game.css"; // <-- Import your dedicated Game page stylesheet

const Tags = ({ tags }) => {
  const handleClick = (tag) => {
    // Redirect to a genre page (to be implemented later)
    window.location.href = `/genre/${tag}`;
  };

  return (
    <div className="tag-container">
      {tags.map((tag, index) => (
        <button key={index} onClick={() => handleClick(tag)} className="tag-button">
          {tag}
        </button>
      ))}
    </div>
  );
};

const Game = () => {
  const { gameId } = useParams(); // retrieve the :gameId from the URL
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/games/${gameId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch game");
        }

        // Assuming your API returns { data: game }
        setGame(data.data || data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchGame();
  }, [gameId]);

  const handleClick = (listType) => {
    // listType should be 0 (library) or 1 (favorites)
    if (listType !== 0 && listType !== 1) {
      console.error("Invalid list type");
      return;
    }
    // TODO: Implement add-to-list functionality here
  };

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <div className="game-page">
      <div className="leftcol">
        <img src={game.image} alt={game.title} className="game-cover" />
        <p>Release date: {game.year}</p>
        <p>Rating: {Math.round(game.sumscore / game.numreviews)}</p>
        
        {/* 
          Future Implementation:
          - These buttons will add the game to the user's library or favorites.
        */}
        <button onClick={() => handleClick(0)} className="library-btn">
          Add to library
        </button>
        <button onClick={() => handleClick(1)} className="favorite-btn">
          Add to favorites
        </button>
      </div>

      <div className="rightcol">
        <h1 className="game-title">{game.title}</h1>
        
        <div className="scrollable-content">
          <Tags tags={game.genre} />
          <p className="game-description">{game.description}</p>
          {/* 
            Future Implementation:
            - Reviews go here
          */}
        </div>
      </div>
    </div>
  );
};

export default Game;
