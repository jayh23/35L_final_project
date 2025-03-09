import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from '../components/ReviewForm.jsx';
import GameReviews from '../components/GameReviews.jsx';
//import Dropdown from "react-bootstrap/Dropdown";
// import Review from '...'; // Mahima

const Tags = ({ tags }) => {
  const handleClick = (tag) => {
    // Redirect to a genre page (to be implemented later)
    window.location.href = `/genre/${tag}`;
  };

  return (
    <div>
      {tags.map((tag, index) => (
        <button key={index} onClick={() => handleClick(tag)} className="tag">
          {tag}
        </button>
      ))}
    </div>
  );
};

// Placeholder for potential add-to-list functionality
const addList = () => {
  // This function can be expanded later if needed.
};

const Game = () => {
  const { gameId } = useParams(); // retrieve the :gameId from the URL
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [error, setError] = useState(null);


  const fetchReviews = async () => {
    const response = await fetch(`/api/reviews?gameid=${gameId}`);
    const data = await response.json();
    
    if (response.ok) {
        setReviews(data.data);
    }
};
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


    fetchReviews();
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
        <img src={game.image} alt={game.title} />
        <p>Release date: {game.year}</p>
        {/* Would be cool to display rating in stars */}
        <p>Rating: {Math.round(game.sumscore / game.numreviews)}</p>
        <button onClick={() => handleClick(0)}>Add to library</button>
        <button onClick={() => handleClick(1)}>Add to favorites</button>
      </div>
      <div className="rightcol">
        <h1>{game.title}</h1>
        <div className="scroll">
          <Tags tags={game.genre} />
          <p>{game.description}</p>
        <GameReviews gameid={gameId} gameTitle={game.title} reviews={reviews} />
        <ReviewForm gameid={gameId} gametitle={game.title} gameimage={game.image} setReviews = {setReviews} />
        </div>
      </div>
    </div>
  );
};

export default Game;