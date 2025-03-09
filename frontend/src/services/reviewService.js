import { useAuthContext } from '../hooks/useAuthContext';

export const useReviewService = () => {
    const { user } = useAuthContext();

    const getAllReviews = async () => {
        try {
            const response = await fetch('/api/reviews/all', {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });
            const data = await response.json();
    
            if (response.ok) {
                return data.data;
            }
        } catch (error) {
            return [];
        }
    };

    const getOneUserReviews = async () => {
        try {
            const response = await fetch('/api/reviews/user', {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });
            const data = await response.json();
    
            if (response.ok) {
                return data.data;
            }
        } catch (error) {
            return [];
        }

    };

    const createReview = async (review) => {
        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review),
            });
            const data = await response.json();

            if (response.ok) {
                return data.data;
            }
        } catch (error) {
            console.error("Error in creating review:", error.message);
        }
    };

    const updateReview = async (id, review) => {
        try {
            const response = await fetch(`/api/reviews/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review),
            });
            const data = await response.json();

            if (response.ok) {
                return data.data;
            }
        } catch (error) {
            console.error("Error in updating review:", error.message);
        }
    };

    const deleteReview = async (id) => {
        try {
            const response = await fetch(`/api/reviews/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });
            const data = await response.json();

            if (response.ok) {
                return data.data;
            }
        } catch (error) {
            console.error("Error in deleting review:", error.message);
        }
    };

    return { getAllReviews, getOneUserReviews, createReview, updateReview, deleteReview };
}

// STEPS TO USE THESE API CALLS:

// 1. Put this in the beginning of your file: 
//      import { useReviewService } from '../services/reviewService';

// 2. Initialize any needed functions:
//      const { getReviews, createReview, updateReview, deleteReview } = useReviewService();

// 3. Use the functions. Below is an example on how to use each function:
//      [reviews, setReviews] = useState([]);

//      Fetch all reviews:
//          useEffect(() => {
//              getReviews().then(setReviews);
//          }, []);

//      Create a new review:
//          useEffect(() => {
//              createReview({ gameId: "game_id", rating: 5, text: "Great game!", privacy: false, likes: 0 }).then(setReviews);
//          }, []);

//      Update an existing review (replace "id" with the actual review ID):
//          useEffect(() => {
//              updateReview("id", { rating: 4, text: "Good game!" }).then(setReviews);
//          }, []);

//      Delete a review (replace "id" with the actual review ID):
//          useEffect(() => {
//              deleteReview("id").then(setReviews);
//          }, []);