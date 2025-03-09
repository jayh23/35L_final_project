import { useAuthContext } from '../hooks/useAuthContext';

export const useListService = () => {
    const { user } = useAuthContext();

    const getAllLists = async () => {
        try {
            const response = await fetch('/api/lists', {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });
            const data = await response.json();
    
            if (response.ok) {
                return data.data;
            }
        } catch (error) {
            return [];
        }
    };

    const createList = async (list) => {
        try {
            const response = await fetch('/api/lists', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(list),
            });
            const data = await response.json();

            if (response.ok) {
                return data.data;
            }
        } catch (error) {
            console.error("Error in creating list:", error.message);
        }
    };

    const updateList = async (id, list) => {
        try {
            const response = await fetch(`/api/lists/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(list),
            });
            const data = await response.json();

            if (response.ok) {
                return data.data;
            }
        } catch (error) {
            console.error("Error in updating list:", error.message);
        }
    };

    const deleteList = async (id) => {
        try {
            const response = await fetch(`/api/lists/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();

            if (response.ok) {
                return data.data;
            }
        } catch (error) {
            console.error("Error in deleting list:", error.message);
        }
    };

    return { getAllLists, createList, updateList, deleteList };
}