import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProfileGameList from '../components/profileComponents/ProfileGameList';
import ProfileFriendCard from '../components/profileComponents/ProfileFriendCard';
import ProfileReview from '../components/profileComponents/ProfileReview'
import ListPage from '../components/ListPage.jsx';

import { useReviewService } from '../services/reviewService';
import { useListService } from '../services/listService';
import { useUserService } from '../services/userService';
import { useAuthContext } from '../hooks/useAuthContext'; 

import '../styles/Profile.css';


const Profile = () => {
    const { username } = useParams();
    const { user } = useAuthContext();

    const { getUserUsername } = useUserService();
    const { getLists, createList, deleteList } = useListService();
    const { getOneUserReviews } = useReviewService();
    
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);
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
    {/*
    // Fetch lists for the authenticated user
    useEffect(() => {
        if (user) {
            getLists(user.token).then((data) => {
                console.log("Fetched lists:", data); // Debugging
                setLists(data || []); // Ensure data is not undefined
            });
        }
    }, [user, getLists]);
*/}

    // Add a new list
    const addListHandler = async (newList) => {
        if (!user) return;
        const createdList = await createList({ ...newList, userId: user._id }, user.token);
        if (createdList) {
            setLists([...lists, createdList]);
        }
    };

    // Remove a list
    const removeListHandler = async (id) => {
        if (!user) return;
        const success = await deleteList(id, user.token);
        if (success) {
            setLists(lists.filter((list) => list._id !== id));
        }
    };

    // Handle list click
    const handleListClick = (list) => {
        setSelectedList(list);
    };

    return (
        <div className='profile-container'>
            <div className="profile-card flex flex-row items-center gap-4 px-5 pt-25">
                <img src={userInfo.avatar || 'https://placehold.co/500x500'} className="w-30 "></img>
                <span className="text-3xl font-bold">{userInfo.username}</span>
            </div>

            <div className='profile-container'>
            <div className="profile-lists-container">
                <h1>Game Lists</h1>
                <ListPage
                    lists={lists}
                    addListHandler={addListHandler}
                    removeListHandler={removeListHandler}
                    onListClick={handleListClick} // Pass click handler
                />
            </div>

            {selectedList && (
                <div className="selected-list-container">
                    <h2>{selectedList.category}</h2>
                    <ProfileGameList list={selectedList} />
                </div>
            )}


            <h1>Friends</h1>
            <div className="friends">
                {friends.map((friend) => (
                    <div key={friend._id}>
                        <h2>{friend.username}</h2>
                        <p>{friend.email}</p>
                    </div>
                ))}
            </div>
                <div className="reviews-container col-span-1">
                    <h1 className="text-2xl font-bold mb-3">Reviews</h1>
                    <div className="flex flex-col">
                        {reviews.map((review) => (
                            <ProfileReview key={review._id} review={review} />
                        ))}
                    </div>
                </div>

                <div className="profile-friends-container row-span-2">
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

