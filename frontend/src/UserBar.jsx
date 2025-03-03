import React from "react";
    import { Link } from 'react-router-dom';

const UserBar = () => { // Like a navbar for userpage
    // Everything placeholder

    let username = "USER NAME";
    let avatar = "PROFILE IMAGE";
    return (
        <>
            <div class="info">
                <h1>{username}</h1>
                <image src={`${avatar}`}></image>
                {/* Other stats if wanted */}
            </div>
            <div class="links">
                <Link to="/library">Library</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/reviews">Reviews</Link>
                <Link to="/friends">Friends</Link>
            </div>
        </>
    );
}

export default UserBar;