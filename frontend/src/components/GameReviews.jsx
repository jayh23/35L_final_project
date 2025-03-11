import { useAuthContext } from "../hooks/useAuthContext.js";
import "../styles/Review.css";

const GameReviews = ({ gameId, gameTitle, reviews = [] }) => {
  const { user } = useAuthContext();

  // Filter reviews for the game and exclude private reviews
  const gameReviews = reviews.filter(
    (review) => review.gameId === gameId && !review.privacy
  );

    console.log('Reviews:', reviews);
  return (
    <div>
      <h1 className="review-subheading">Reviews for {gameTitle}</h1>
      {gameReviews.length > 0 ? (
        gameReviews.map((review) => (
          <div key={review._id} className="review-display">
           <div className="review-title"> 
            <h3 className="user-name">{review.username}</h3>
            <h4 className="game-name">
              {review.gamename}: {review.rating}⭐  
            </h4>
          </div>
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