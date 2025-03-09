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
        setReviews(data.data || data); // Ensure data is an array
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [gameid, userid]);

  // Submit a new review
  /*
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
  */

  /*
  const submitReview = async (review) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userid}`, // Use user.token as the Authorization token
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  */

  const submitReview = async (review) => {
    setIsLoading(true);
    setError(null);

    try {
      // Retrieve user data from localStorage
      const user = JSON.parse(localStorage.getItem('user'));

      // If no user is found, throw an error
      if (!user || !user.token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Use the token from the stored user object
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review");
      }

      const data = await response.json();
      setReviews((prevReviews) => [...prevReviews, data]);
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };


  const deleteReview = async (reviewId) => {
    setIsLoading(true);
    setError(null);
  
    try {
      // Retrieve user data from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
  
      // If no user is found, throw an error
      if (!user || !user.token) {
        throw new Error("No authentication token found");
      }
  
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`, // Add Authorization header
        },
      });
  
      if (!response.ok) throw new Error('Failed to delete review');
  
      // Remove the deleted review from the state
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return { reviews, isLoading, error, submitReview, deleteReview };
};

