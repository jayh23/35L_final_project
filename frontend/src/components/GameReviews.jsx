import { useEffect, useState } from "react";
import  {useReviews}  from "../hooks/useReviews.js";
import { useAuthContext } from "../hooks/useAuthContext.js";
import "../styles/Review.css";

const GameReviews = ({ gameid, gameTitle,  reviews = []  }) => {
  //const { reviews, isLoading, error } = useReviews(gameid, null);
  const { user } = useAuthContext(); 


  const gameReviews = reviews.filter((review) => review.gameid === gameid);
  return (
    <div>
      <h1>Reviews for {gameTitle}</h1>
      {gameReviews.length > 0 ? (
        gameReviews.map((review) => (
          <div key={review._id} className="review-display">

            <h3 className="review-info">{review.username}</h3>
            <h4 className="review-info">{review.rating} ⭐</h4>
            <p className="review-text">{review.text}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first!</p>
      )}
    </div>
  );
};


export default GameReviews;
