import { useState, useEffect } from 'react';
import { useSignup } from '../hooks/useSignup';
import { useAuthContext } from '../hooks/useAuthContext';
import { useListService } from '../services/listService';
import "../styles/Auth.css";


const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error } = useSignup();
    const {user} = useAuthContext();
    const{getLists, createList} = useListService();
    const[lists, setLists] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(username, password);
        //create default lists if successful sign up
    };

    useEffect(() => {
        if (user && user.username) {
            
            fetchAndCreateDefaultLists();
            getLists(username).then(setLists);
        }    
    }, [user]);

    const fetchAndCreateDefaultLists = async () => {
        console.log("User in fetchAndCreateDefaultLists:", user);
        if (!user || !user.username) {
            return;
        }
  
        try {
            const userLists = await getLists(user.username);
            setLists(userLists || []);
  
            //Check if Library & Favorites exist
            const hasLibrary = userLists.some(list => list.category === "Library");
            const hasFavorites = userLists.some(list => list.category === "Favorites");
  
            if (!hasLibrary) {
                const libraryList = await createList({
                    userId: user._id,
                    category: "Library",
                    privacy: false,
                    games: []
                });
                console.log("Created Library list:", libraryList);
                setLists(prevLists => [...prevLists, libraryList]);
            }
  
            if (!hasFavorites) {
                const favoritesList = await createList({
                    userId: user._id,
                    category: "Favorites",
                    privacy: false,
                    games: []
                });
                console.log("Created Favorites list:", favoritesList);
                setLists(prevLists => [...prevLists, favoritesList]);
            }
        } catch (error) {
            console.error("Error checking/creating default lists:", error);
        }
    };

    
  
  
    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Username:</label>
            <input type="name" onChange={(e) => setUsername(e.target.value)} value={username} />
            <label>Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            
            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup;