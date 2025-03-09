import { useEffect, useState } from 'react';

import { useReviewService } from '../services/reviewService';
import { useListService } from '../services/listService';
import { useUserService } from '../services/userService';

import { useAuthContext } from '../hooks/useAuthContext';

const Profile = () => {
    const { user } = useAuthContext();
    
    const [lists, setLists] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [friends, setFriends] = useState([]);

    const { getAllLists } = useListService();
    const { getOneUserReviews } = useReviewService();
    const { getFriends } = useUserService();

    useEffect(() => {
        getAllLists().then(setLists);
        getOneUserReviews().then(setReviews);
        getFriends().then(setFriends);
    }, []);
    
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
            </div>
        </ >
    )
}

export default Profile;