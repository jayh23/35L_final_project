import { useEffect, useState } from "react";
import  {useReviews}  from "../hooks/useReviews.js";
import "../styles/Review.css";


const UserReviews = ({ userid, username }) => {
  const { reviews, isLoading, error, deleteReview } = useReviews(null, userid);
  const { user } = useAuthContext(); 

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
        await deleteReview(reviewId);
    }
};

  return (
    <div>
      <h1>Reviews by {username}</h1>
      {isLoading && <p>Loading user reviews...</p>}
      {error && <p>{error}</p>}
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review-display">
            
            {user && user._id === review.userid && (
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(review._id)}
                            >
                                🗑️
                            </button>
                        )}


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
