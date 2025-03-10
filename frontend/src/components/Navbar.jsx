import { Link } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import "../styles/Navbar.css";
import SearchBar from "./Searchbar";


const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <>
            
            {/* Allows user to logout if user is signed in. */}
            {user && (                
                <nav className="navbar">
                <h1>GameBoxd</h1>
                <div className="nav-links">
                  <Link to="/">Home</Link>
                  {/* <a href="/search">Search</a> */}
                  <SearchBar />
                  <Link to="/friends">Friends</Link>
                  <Link to={`/profile/${user.username}`}>{user.username}</Link>
                  <button onClick={handleClick}>Log out</button>
                </div>
                </nav>

                
            )}
            {/* Allows user to login or signup if user is not signed in. */}
            {!user && (
                <nav className="navbar">
                <h1>GameBoxd</h1>
                <div className="nav-links">
                  <Link to="/">Home</Link>
                  {/* <a href="/search">Search</a> */}
                  <SearchBar />
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </div>
                </nav>

            )}

        </>
    )
}

export default Navbar;