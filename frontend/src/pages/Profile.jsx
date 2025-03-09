import { useEffect, useState } from 'react';

import { useReviewService } from '../services/reviewService';
import { useListService } from '../services/listService';
import { useUserService } from '../services/userService';

import { useAuthContext } from '../hooks/useAuthContext';

// import UserReviews from '../components/UserReviews.jsx';

const Profile = () => {
    const { user } = useAuthContext();
    
    const [lists, setLists] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [friends, setFriends] = useState([]);

    const { getLists } = useListService();
    const { getOneUserReviews } = useReviewService();
    const { getFriends } = useUserService();

    useEffect(() => {
        getLists().then(setLists);
        getOneUserReviews().then(setReviews);
        getFriends().then(setFriends);
    }, []);

  /*
    useEffect(() => {
        if(user){
        const fetchReviews = async () => {
            
            const response = await fetch(`/api/reviews?userid=${user.token}`);
            const data = await response.json();
            
            if (response.ok) {
                setReviews(data.data);
            }
        };

        fetchReviews();
        }
    }, [user]);

    if (!user) {
        return <p>Loading user data...</p>;
    } */

    return (
        <>

            <h1>Profile</h1>
            <p>Welcome to the Profile page.</p>

            <h1>Reviews</h1>
            <div className="reviews">
                {reviews.map((review) => (
                    <div key={review._id}>
                        <h2>{review.rating}</h2>
                        <p>{review.text}</p>
                    </div>
                ))}
             </div>

            {/* Display the user's reviews using the UserReviews component 
                <div className="reviews">
                <UserReviews userid={user.token} username={user.username} reviews={reviews} setReviews={setReviews}/>*/}         

            <h1>Lists</h1>
            <div className="lists">
                {lists.map((list) => (
                    <div key={list._id}>
                        <h2>{list.category}</h2>
                        <p>{list.games}</p>
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
             {/* Display the user's reviews using the UserReviews component */}
             <div className="reviews">
                <UserReviews userid={user.userId} username={user.username} reviews={reviews} setReviews={setReviews}/>
            </div>
        </ >
    )
}

export default Profile;