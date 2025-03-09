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

    return { getFriends };
}