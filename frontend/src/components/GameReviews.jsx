import { useEffect, useState } from "react";
import  {useReviews}  from "../hooks/useReviews.js";
import "./Review.css";

const GameReviews = ({ gameid, gameTitle }) => {
  const { reviews, isLoading, error } = useReviews(gameid, null);

  return (
    <div>
      <h1>Reviews for {gameTitle}</h1>
      {isLoading && <p>Loading reviews...</p>}
      {error && <p>{error}</p>}
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review-display">
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
