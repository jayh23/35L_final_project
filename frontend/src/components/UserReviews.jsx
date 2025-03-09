import { useEffect, useState } from "react";
import  {useReviews}  from "../hooks/useReviews.js";

import { useAuthContext } from "../hooks/useAuthContext.js";
import "../styles/Review.css";


const UserReviews = ({ userid, username, reviews = [], setReviews }) => {
  
  //const { reviews, isLoading, error, deleteReview } = useReviews(null, userid);
  const { user } = useAuthContext(); 
  
  

    // Debugging: Log user and reviews
    console.log('User:', user);
    console.log('Reviews:', reviews);



    const userReviews = reviews.filter((review) => review.userid === userid);

    const handleDelete = async (reviewId) => {
      if (window.confirm('Are you sure you want to delete this review?')) {
        try {
          const response = await fetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`, // Include the authorization token
            },
          });
  
          if (response.ok) {
            // Remove the deleted review from the state
            setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
          } else {
            throw new Error('Failed to delete review');
          }
        } catch (error) {
          console.error('Error deleting review:', error);
        }
      }
    };

  return (
    <div>
      <h1 className="review-heading">Reviews by {username}</h1>
      {userReviews.length > 0 ? (
        userReviews.map((review) => (
          
           // Debugging: Log review user ID and logged-in user ID
          console.log('Review User ID:', review.userid),
          console.log('Logged-in User ID:', userid),

          <div key={review._id} className="review-display">
            <h3 className="review-info">{username}</h3>
            <img src={review.gameimage} display="flex" border="1px solid #ccc" width="100px" height="150px" />
            <h4 className="review-info" text-align="right"> {review.gamename}:  {review.rating}⭐ </h4>
            <p className="review-text">{review.text}</p>
            <button className="delete-button" onClick={() => handleDelete(review._id)} > 🗑️ </button>
          </div>
        ))
      ) : (
        <p>{username} hasn’t written any reviews yet.</p>
      )}
    </div>
  );
};


export default UserReviews;
