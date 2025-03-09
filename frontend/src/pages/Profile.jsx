import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';


const Profile = () => {
    const [games, setGames] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [friends, setFriends] = useState([]);
    const [lists, setLists] = useState([]);

    const { user } = useAuthContext();

        // Fetch friends list
        useEffect(() => {
            const fetchFriends = async () => {
                if (!user) return;
                
                const response = await fetch('/api/friends', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                
                if (response.ok) {
                    setFriends(data.friends);
                }
            };
            
            fetchFriends();
        }, [user]);

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

    useEffect(() => {
        const fetchLists = async () => {
            if (!user) return;
            
            const response = await fetch('/api/lists', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                setLists(data.data);
            }
        }

        fetchLists();
    }, [user]);


    return (
        <>

            <h1>Profile</h1>
            <p>Welcome to the Profile page.</p>

            <h1>Games</h1>
            <div className="games">
                {games.map((game) => (
                    <div key={game._id}>
                        <h2>{game.title}</h2>
                        <p>{game.year}</p>
                    </div>
                ))}
            </div>

            <h1>Friends</h1>
            <div className="friends">
                {friends.map((friend) => (
                    <div key={friend._id}>
                        <h2>{friend.username}</h2>
                        <p>{friend.email}</p>
                    </div>
                ))}
            </div>

            <h1>Reviews</h1>
            <div className="reviews">
                {reviews.map((review) => (
                    <div key={review._id}>
                        <h2>{review.rating}</h2>
                        <p>{review.text}</p>
                    </div>
                ))}
            </div>

            <h1>Lists</h1>
            <div className="lists">
                {lists.map((list) => (
                    <div key={list._id}>
                        <h2>{list.games}</h2>
                        <p>{list.category}</p>
                    </div>
                ))}
            </div>

        </ >
    )
}

export default Profile;