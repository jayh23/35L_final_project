import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useUserService } from '../../services/userService';

import '../../styles/Profile.css';

const ProfileFriendList = ({ friend }) => {
    const { getUserId } = useUserService();

    const [user, setUser] = useState([]);

    useEffect(() => {
        getUserId(friend).then(setUser);
    }, [friend]);

    return (
        
        <Link to={`/profile/${user.username}`} className="profile-friend-card group flex flex-row items-center p-2 gap-2">
            {/* <img src={user.avatar || 'https://placehold.co/500x500'} className="w-10 object-cover"></img> */}

            <img 
                src={user.avatar || 'https://placehold.co/500x500'} 
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-gray-300 group-hover:underline">{user.username}</div>
        </Link>

    );
}

export default ProfileFriendList;