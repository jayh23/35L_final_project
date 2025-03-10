import { useState } from 'react';

import { useSignup } from '../hooks/useSignup';

import "../styles/Auth.css";


const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(username, password);
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