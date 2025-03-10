import  {useReviews}  from "../hooks/useReviews.js";
import { useAuthContext } from "../hooks/useAuthContext.js"; // Import useAuthContext
import { useEffect, useState } from "react";
import "../styles/Review.css";

const ReviewForm = ({ gameid, gametitle, gameimage, reviews, setReviews }) => {
  const { user } = useAuthContext(); // Get the logged-in user
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [privacy, setPrivacy] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    if (user && reviews) {
      const userReview = reviews.find(
        (review) => review.userid === user.userId && review.gameid === gameid
      );
      if (userReview) {
        setHasReviewed(true); // User has already reviewed the game
      }
    }
  }, [user, reviews, gameid]);
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    if (hasReviewed) {
      setError("You have already submitted a review for this game.");
      return;
    }
    
    const review = {
      gameid,
      userid: user.userId, // Use user.token as userid
      username: user.username, // Include the logged-in user's username
      gamename: gametitle, // Include the game title
      gameimage: gameimage, // Include the game image
      rating:rating,
      text:text,
      privacy:privacy,
    };
    
    console.log("Submitting review:", review); // Debugging
    setIsLoading(true);
    setError(null);


     try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review");
      }

      const data = await response.json();

      // Update the reviews state in Game.jsx
      setReviews((prevReviews) => [...prevReviews, data]);

    
  // Reset the form
  setText("");
  setRating(5);
  setPrivacy(false);
  setIsSubmitted(true);
} catch (err) {
  setError(err.message);
} finally {
  setIsLoading(false);
}

  };

  return (
    <div>
      <h2 className="review-subheading">Enter a review:</h2>
      {error && <p>{error}</p>}
      {isSubmitted && <p>Review Submitted!</p>}
      <form onSubmit={handleSubmit} className="submit-form">
        <h2 className="user-name">{user.username}</h2>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="selection-button"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Stars
            </option>
          ))}
        </select>

        <textarea
          placeholder="Write your review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-box"
        />

        <label>
          Private Review
          <input
            type="checkbox"
            checked={privacy}
            onChange={(e) => setPrivacy(e.target.checked)}
          />
        </label>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;