import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";
import "../styles/Game.css"; // <-- Import your dedicated Game page stylesheet
import ReviewForm from '../components/ReviewForm.jsx';
import GameReviews from '../components/GameReviews.jsx';
import ListDropdown from "../components/ListDropdown.jsx";
import RemoveFromListDropdown from "../components/RemoveFromListDropdown.jsx";


//import Dropdown from "react-bootstrap/Dropdown";
// import Review from '...'; // Mahima

const Tags = ({ tags }) => {
  const handleClick = (tag) => {    
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
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const [userLists,setUserLists] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews', {
        headers: {
          //'Authorization': `Bearer ${user.token}`,
          // Don't need to be signed in to view reviews
        },
      });
      const data = await response.json();
      console.log("All reviews from backend:", data); // Debugging

      if (response.ok) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  
  const fetchUserLists = async () => {
    try {
      const response = await fetch(`/api/lists/${user.username}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUserLists(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch user lists");
      }
    } catch (error) {
      console.error("Error fetching user lists:", error);
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
        setGame(data.data || data);
      } catch (err) {
        setError(err.message);
      }
    };
  
    fetchGame();
    fetchReviews();
  

    if (user) {
      fetchUserLists();
    }
  }, [gameId, user]);

  const handleAddToList = async (listId, gameId) => {
    console.log("List ID:", listId);
    console.log("Game ID:", gameId);

    if (!listId || !gameId) {
        console.error("Error: Missing listId or gameId.");
        return;
    }

    try {
        const response = await fetch(`/api/lists/add/${listId}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ games: [gameId] }),
        });

        if (!response.ok) {
            throw new Error("Failed to add game to list.");
        }

        console.log("Game added successfully!");
    } catch (error) {
        console.error("Error adding game to list:", error);
    }
};

const handleRemoveFromList = async (listId, gameId) => {
  console.log("Removing from list - List ID:", listId, "Game ID:", gameId);

  if (!listId || !gameId) {
    console.error("Error: Missing listId or gameId.");
    return;
  }

  try {
    const response = await fetch(`/api/lists/remove/${listId}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ games: [gameId] }),
    });

    if (!response.ok) {
      throw new Error("Failed to remove game from list.");
    }

    console.log("Game removed successfully!");
    fetchUserLists(); // 
  } catch (error) {
    console.error("Error removing game from list:", error);
  }
};


  // Calculate average rating based on reviews for this game.
  // Only include reviews where review.gameid matches the current gameId.
  const gameReviews = reviews.filter(review => review.gameId === gameId);
  const averageRating = gameReviews.length > 0 
    ? gameReviews.reduce((sum, review) => sum + review.rating, 0) / gameReviews.length 
    : null;

  // const handleClick = (listType) => {
  //   // listType should be 0 (library) or 1 (favorites)
  //   if (listType !== 0 && listType !== 1) {
  //     console.error("Invalid list type");
  //     return;
  //   }
  //   // TODO: Implement add-to-list functionality here
  // };

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
        {/* Display average rating calculated from reviews; fallback if no reviews exist */}
        <p>Rating: {averageRating ? averageRating.toFixed(1) : "No ratings yet"}</p>
        
        {user && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
        <ListDropdown lists={userLists} onSelectList={handleAddToList} gameId={gameId} />
        <RemoveFromListDropdown lists={userLists} onRemoveFromList={handleRemoveFromList} gameId={gameId} />
        </div>
        )}
        
        {/* <button onClick={() => handleClick(0)} className="library-btn">
          Add to library
        </button>
        <button onClick={() => handleClick(1)} className="favorite-btn">
          Add to favorites
        </button> */}
      </div>

      <div className="rightcol">
        <h1 className="game-title">{game.title}</h1>
        
        {/* Static game details (tags & description) */}
        <div className="game-details">
          <Tags tags={game.genre} />
          <p className="game-description">{game.description}</p>
        </div>

        {/* Reviews container scrolls independently */}
        <div className="reviews-container">
          <GameReviews gameId={gameId} gameTitle={game.title} reviews={reviews} />

          {user? (
          <ReviewForm 
            gameId={gameId}  gametitle={game.title}  gameimage={game.image} reviews={reviews} setReviews={setReviews} 
          />
          ) : (

            <p style={{ color: "#aaa" }}>Log in to post a review.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
