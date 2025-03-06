import  {useReviews}  from "../hooks/useReviews.js";
import { useState } from "react";
import "../styles/Review.css";

const ReviewForm = ({ gameid, userid, currentUsername }) => {
  const { submitReview, isLoading, error } = useReviews(gameid, userid);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [privacy, setPrivacy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await submitReview({ gameid, userid, rating, text, privacy });

    setText("");
    setRating(5);
    setPrivacy(false);
  };

  return (
    <div>
      <h2 className="review-subheading">Enter a review:</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="submit-form">
        <h2 className="user-name">{currentUsername}</h2>

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