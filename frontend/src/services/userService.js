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
            const response = await fetch(`/api/user/profile?username=${username}`);
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
            const response = await fetch(`/api/user/profile?id=${id}`);
            const data = await response.json();

            if (response.ok) {
                return data.data;
            }

        } catch (error) {
            return [];
        }
    };

    const updateUserAvatar = async (formData, token) => {
        const response = await fetch('/api/user/avatar', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
      
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Avatar update failed');
        }
      
        return response.json();
      };

    return { getFriends, getUserUsername, getUserId, updateUserAvatar };
}