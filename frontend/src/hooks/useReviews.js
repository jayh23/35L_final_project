import { useState, useEffect } from "react"; 

export const useReviews = (gameid, userid) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch reviews based on gameid or userid
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let url = "/api/reviews";
        if (gameid) url += `?gameid=${gameid}`;
        if (userid) url += `?userid=${userid}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch reviews");

        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [gameid, userid]);

  // Submit a new review
  const submitReview = async (newReview) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      const savedReview = await response.json();
      setReviews((prevReviews) => [...prevReviews, savedReview]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { reviews, isLoading, error, submitReview };
};

