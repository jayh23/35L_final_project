import { useAuthContext } from '../hooks/useAuthContext';

export const useUserService = () => {
    const { user } = useAuthContext();

    const getFriends = async () => {
        try {
            const response = await fetch('/api/friends', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();
            
            if (response.ok) {
                return data.friends;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    };

    const getUserUsername = async (username) => {
        try {
            const response = await fetch(`/api/user/profile/${username}`);
            const data = await response.json();

            if (response.ok) {
                return data.data;
            }

        } catch (error) {
            return [];
        }
    };

    const getUserId = async (id) => {
        try {
            const response = await fetch(`/api/user/${id}`);
            const data = await response.json();

            if (response.ok) {
                return data.data;
            }

        } catch (error) {
            return [];
        }
    };

    return { getFriends, getUserUsername, getUserId };
}