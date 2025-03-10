import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProfileGameList from '../components/profileComponents/ProfileGameList';
import ProfileFriendCard from '../components/profileComponents/ProfileFriendCard';
import ProfileReview from '../components/profileComponents/ProfileReview'

import { useReviewService } from '../services/reviewService';
import { useListService } from '../services/listService';
import { useUserService } from '../services/userService';

import '../styles/Profile.css';

const Profile = () => {
    const { username } = useParams();

    const { getUserUsername } = useUserService();
    const { getLists } = useListService();
    const { getOneUserReviews } = useReviewService();
    
    const [lists, setLists] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        getUserUsername(username).then(setUserInfo);
        getLists(username).then(setLists);
        getOneUserReviews(username).then(setReviews);   
    }, [username]);

    
    useEffect(() => {
        // Set friends state once userInfo is available
        if (userInfo.friends) {
            setFriends(userInfo.friends);
        }
    }, [userInfo]);

    return (
        <div className='profile-container'>
            <div className="profile-card flex flex-row items-center gap-4 px-5 pt-25">
                <img src={userInfo.avatar || 'https://placehold.co/500x500'} className="w-30 "></img>
                <span className="text-3xl font-bold">{userInfo.username}</span>
            </div>

            <div className="profile-bio grid grid-flow sm:grid-flow-col gap-5 py-5 px-5 sm:px-15">

                <div className="profile-lists-container col-span-2">
                    <h1 className="text-2xl font-bold mb-3">Game Lists</h1>
                    <div className="flex flex-col gap-3">
                        {lists.map((list) => (
                            <ProfileGameList key={list._id} list={list} />
                        ))}
                    </div>
                </div>
                
                <div className="reviews-container col-span-2">
                    <h1 className="text-2xl font-bold mb-3">Reviews</h1>
                    <div className="flex flex-col">
                        {reviews.map((review) => (
                            <ProfileReview key={review._id} review={review} />
                        ))}
                    </div>
                </div>

                <div className="profile-friends-container col-span-2 sm:row-span-2">
                    <h1 className="text-2xl font-bold mb-3">Friends</h1>
                    <div className="friends">
                        {friends.map((friend) => (
                            <ProfileFriendCard key={friend} friend={friend} /> 
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile;

