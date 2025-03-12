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
                <Link to="/" className="nav-title text-2xl font-bold">GameBoxd</Link>
                    <div className="nav-links">
                        {/*<Link to="/" className="nav-link">Home</Link>*/}
                        {/* <a href="/search">Search</a> */}
                        <SearchBar className="nav-link" />
                        <Link to="/friends" className="nav-link tab"><span>Friends</span></Link>
                        <Link to={`/profile/${user.username}`} className="nav-link tab"><span>{user.username}</span></Link>
                        <div className="nav-link"><button onClick={handleClick}>Log out</button></div>
                    </div>
                </nav>

                
            )}
            {/* Allows user to login or signup if user is not signed in. */}
            {!user && (
                <nav className="navbar">
                <h1>GameBoxd</h1>
                <div className="nav-links">
                  <Link to="/" className="nav-link">Home</Link>
                  {/* <a href="/search">Search</a> */}
                  <SearchBar className="nav-link" />
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/signup" className="nav-link">Signup</Link>
                </div>
                </nav>

            )}

        </>
    )
}

export default Navbar;