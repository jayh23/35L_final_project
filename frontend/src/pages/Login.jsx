import { useState } from 'react';
import { useLogin } from '../hooks/useLogin'

import "../styles/Auth.css";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(username, password);
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>

            <label>Username:</label>
            <input type="name" onChange={(e) => setUsername(e.target.value)} value={username} />
            <label>Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />

            <button disabled={isLoading}>Log In</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login;