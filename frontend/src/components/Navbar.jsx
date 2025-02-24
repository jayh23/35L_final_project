import { Link } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <>
            <Link to="/home">Home</Link>
            {user && (
                <span>
                    <span>{user.username}</span>
                    <button onClick={handleClick}>Log out</button>
                </span>
            )}
            {!user && (
                <span>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </span>
            )}

        </>
    )
}

export default Navbar;