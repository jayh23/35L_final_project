import { useAuthContext } from '../hooks/useAuthContext';


export const useListService = () => {
    const { user } = useAuthContext();

    const getLists = async (username) => {
        try {
            const response = await fetch(`/api/lists/${username}`);
            const data = await response.json();
    
            if (response.ok) {
                return data.data;
            }
        } catch (error) {
            return [];
        }
    };

    const createList = async (list, user = user) => {
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

    const addGameToList = async (id, games) => {
        try {
            const response = await fetch(`/api/lists/add/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(games),
            });
            const data = await response.json();

            if (response.ok) {
                return data.data;
            }
        } catch (error) {
            console.error("Error in adding game to list:", error.message);
        }
    };

    const removeGameFromList = async (id, games) => {
        try {
            const response = await fetch(`/api/lists/remove/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(games),
            });
            const data = await response.json();

            if (response.ok) {
                return data.data;
            }
        } catch (error) {
            console.error("Error in removing game from list:", error.message);
        }
    };

    const deleteList = async (id) => {
        try {
            const response = await fetch(`/api/lists/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });
            const data = await response.json();

            if (response.ok) {
                return data.data;
            }
        } catch (error) {
            console.error("Error in deleting list:", error.message);
        }
    };

    return { getLists, createList, addGameToList, removeGameFromList, deleteList };
}

// STEPS TO USE THESE API CALLS:

// 1. Put this in the beginning of your file: 
//      import { useListService } from '../services/listService';

// 2. Initialize any needed functions:
//      const { getLists, createList, addGameToList, removeGameFromList, deleteList } = useListService();

// 3. Use the functions. Below is an example on how to use each function:
//    Replace parameters with actual values (e.g. replace "id" with the actual list ID).

//      [lists, setLists] = useState([]);

//      Fetch all lists for a specific user:
//          useEffect(() => {
//              getLists().then(setLists);
//          }, []);

//      Create a new list:
//          useEffect(() => {
//              createList({ games: [], privacy: false, category: "category name" }).then(setLists);
//          }, []);

//      Add a game to an existing list:
//          useEffect(() => {
//              addGameToList("id", { games: ["game_id"] }).then(setLists);
//          }, []);

//      Remove a game from an existing list:
//          useEffect(() => {
//              removeGameFromList("id", { games: ["game_id"] }).then(setLists);
//          }, []);

//      Delete a list:
//          useEffect(() => {
//              deleteList("id").then(setLists);
//          }, []);

//      You can actually put all necessary functions in a single useEffect hook to run them.