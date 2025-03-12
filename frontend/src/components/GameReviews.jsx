import { useAuthContext } from "../hooks/useAuthContext.js";
import "../styles/Review.css";

const GameReviews = ({ gameId, gameTitle, reviews = [] }) => {
  const { user } = useAuthContext();

  // Filter reviews for the game and exclude private reviews
  const gameReviews = reviews.filter( (review) => review.gameId === gameId);

    console.log('Reviews:', reviews);
  return (
    <div>
      <h1 className="review-subheading">Reviews for {gameTitle}</h1>
      {gameReviews.length > 0 ? (
        gameReviews.map((review) => {
          const isPrivateAndOwnedByUser = review.privacy && user && user.userId === review.userId;

          if (!review.privacy || isPrivateAndOwnedByUser) {
            return (
              <div key={review._id} className="review-display">
                <div className="review-title">
                  <h3 className="user-name">{review.username}</h3>
                  <span className="game-name">{review.gamename}</span>
                </div>
      
                <div className="review-rating text-yellow-400 font-bold">
                  {'★'.repeat(Math.floor(review.rating))}
                </div>
                <p className="review-text">{review.text}</p>
                {isPrivateAndOwnedByUser && (
                    <span className="private-header">(private)</span>
                  )}
              </div>
            );
          }
          return null; // Skip rendering private reviews not owned by the user
        })
      ) : (
        <p>No reviews yet. Be the first!</p>
      )}
    </div>
  );
};

export default GameReviews;