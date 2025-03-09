import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js';
import UserReviews from '../components/UserReviews.jsx';


const Profile = () => {
    const [games, setGames] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { user } = useAuthContext();



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
            const response = await fetch(`/api/reviews?userid=${user.token}`);
            const data = await response.json();
            
            if (response.ok) {
                setReviews(data.data);
            }
        }

        fetchReviews();
    }, [user]);

    if (!user) {
        return <p>Loading user data...</p>;
    }

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

             {/* Display the user's reviews using the UserReviews component */}
             <div className="reviews">
                <UserReviews userid={user.token} username={user.username} reviews={reviews} setReviews={setReviews}/>
            </div>
        </>
    )
}

export default Profile;