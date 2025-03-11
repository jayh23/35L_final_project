import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProfileGameList from '../components/profileComponents/ProfileGameList';
import ProfileFriendCard from '../components/profileComponents/ProfileFriendCard';
import ProfileReview from '../components/profileComponents/ProfileReview';
import ListPage from "../components/ListPage"; 

import { useReviewService } from '../services/reviewService';
import { useListService } from '../services/listService';
import { useUserService } from '../services/userService';
import { useAuthContext } from '../hooks/useAuthContext'; // Added

import '../styles/Profile.css';


const Profile = () => {
    const { username } = useParams();
    const { user } = useAuthContext();


    const { getUserUsername } = useUserService();
    const { getLists, createList, deleteList } = useListService();
    const { getOneUserReviews } = useReviewService();
    
    const [lists, setLists] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [friends, setFriends] = useState([]);

    // Get the logged-in user info from auth context
    const { user: loggedInUser } = useAuthContext(); // Added

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

    // Determine if this is your own profile
    const isOwnProfile = loggedInUser && loggedInUser.username === username; // Added

    // Define a function to delete a review (only available on your own profile)
    const handleDeleteReview = async (reviewId) => { // Added
      try {
        const response = await fetch(`/api/reviews/${reviewId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${loggedInUser.token}`
          }
        });
        if (response.ok) {
          // Update reviews state to remove the deleted review
          setReviews(prevReviews => prevReviews.filter(r => r._id !== reviewId));
        } else {
          console.error("Failed to delete review");
        }
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    };

    return (
        <div className='profile-container'>
            <div className="profile-card flex flex-row items-center gap-4 px-5 pt-25">
                <img src={userInfo.avatar || 'https://placehold.co/500x500'} className="w-30 " alt="Avatar"></img>
                <span className="text-3xl font-bold">{userInfo.username}</span>
            </div>

            <div className="profile-bio grid grid-flow sm:grid-flow-col gap-5 py-5 px-5 sm:px-20">

                <div className="profile-lists-container col-span-2">
                    <h1 className="text-2xl font-bold mb-3">Game Lists</h1>
                    <div className="flex flex-col gap-3">
                        {lists.map((list) => (
                            <ProfileGameList key={list._id} list={list} />
                        ))}
                    </div>
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
                
                <div className="reviews-container col-span-2">
                    <h1 className="text-2xl font-bold mb-3">Reviews</h1>
                    <div className="flex flex-col">
                        {reviews.map((review) => (
                            <ProfileReview 
                              key={review._id} 
                              review={review} 
                              deletable={isOwnProfile}      // Added: show delete button if it's your own profile
                              onDelete={handleDeleteReview} // Added: function to call when deleting a review
                            />
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
        </div>
    )
}

export default Profile;
