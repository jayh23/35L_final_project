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
      <h1>Reviews for {gameTitle}</h1>
      {gameReviews.length > 0 ? (
        gameReviews.map((review) => (
          <div key={review._id} className="review-display">
            <h3 className="review-info">{review.username}</h3>
            <h4 className="review-info">
              {review.gamename}: {review.rating}⭐
            </h4>
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