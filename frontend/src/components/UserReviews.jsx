import { useEffect, useState } from "react";
import  {useReviews}  from "../hooks/useReviews.js";
import "./Review.css";


const UserReviews = ({ userid, username }) => {
  const { reviews, isLoading, error } = useReviews(null, userid);

  return (
    <div>
      <h1>Reviews by {username}</h1>
      {isLoading && <p>Loading user reviews...</p>}
      {error && <p>{error}</p>}
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review-display">
            <h3 className="review-info">{review.username}</h3>
            <h4 className="review-info">{review.rating} ⭐</h4>
            <p className="game-title">Game ID: {review.gameid}</p>
            <p className="review-text">{review.text}</p>
          </div>
        ))
      ) : (
        <p>{username} hasn’t written any reviews yet.</p>
      )}
    </div>
  );
};


export default UserReviews;
