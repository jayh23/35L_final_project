import { useState, useEffect } from 'react';

import { useSignup } from '../hooks/useSignup';
import { useListService } from '../services/listService';

import "../styles/Auth.css";


const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { signup, isLoading, error } = useSignup();

    const { createList } = useListService(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = await signup(username, password);

        if (user?.token) {
            console.log(user.token, user._id);
            await Promise.all([
                createList({
                    userId: user._id,
                    category: "Library",
                    privacy: false,
                    games: []
                }, user),
                createList({
                    userId: user._id,
                    category: "Favorites",
                    privacy: false,
                    games: []
                }, user)
                
            ])
        }
    }

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