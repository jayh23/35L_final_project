import { useEffect, useState } from 'react';

const Profile = () => {
    const [games, setGames] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch('/api/games');
            const data = await response.json();
            
            if (response.ok) {
                setGames(data.data);
            }
        }

        fetchGames();
    }, []);
    
    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch('/api/reviews');
            const data = await response.json();
            
            if (response.ok) {
                setReviews(data.data);
            }
        }

        fetchReviews();
    }, []);

    return (
        <>
            <h1>Profile</h1>
            <p>Welcome to the Profile page.</p>

            <div className="games">
                {games.map((game) => (
                    <div key={game._id}>
                        <h2>{game.title}</h2>
                        <p>{game.year}</p>
                    </div>
                ))}
            </div>

            <div className="reviews">
                {reviews.map((review) => (
                    <div key={review._id}>
                        <h2>{review.rating}</h2>
                        <p>{review.text}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Profile;