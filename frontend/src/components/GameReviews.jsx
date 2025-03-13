import { useAuthContext } from "../hooks/useAuthContext.js";
import { Link } from "react-router-dom";
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
            <Link to={`/profile/${review.username}`}><h3 className="user-name">{review.username}</h3></Link>
            <span className="game-name">{review.gamename}</span>
          </div>
            <div className="review-rating text-yellow-400 font-bold">
              {'★'.repeat(Math.floor(review.rating))}
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