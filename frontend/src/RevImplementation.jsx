import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import './App.css'
import GameReviews from "./components/GameReviews";
import UserReviews from "./components/UserReviews";
import ReviewForm from "./components/ReviewForm";


// Mock user
const mockUser = {
  username: "Mahima",
  password: "bhella",
  avatar: "bob",
  friends: [], 

};

// Mock review data
const mockReview = {
  gameid: "456",
  userid: mockUser.username,
  rating: 5,
  text: "This is a great game!",
  privacy: false,
};

// Log the mock review data
console.log("Mock Review Data:", mockReview);



function RevImplementation () {
  /*
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Mock authentication check (replace this with actual authentication logic)
    setCurrentUser(mockUser);
  }, []);
*/

  return (
    /*
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
     
    </>

    */
    <Router>
      <div className="App">
      {/* Navigation Links */}
      <nav>
          <Link to="/">Home</Link> | 
          <Link to="/game/testGame">Game Reviews</Link> | 
          <Link to="/user/123">User Reviews</Link>
        </nav>

        <Routes>
          {/* Home Page */}
          <Route path="/" element={<h1>Welcome to the Game Review App</h1>} />

          {/* Reviews for a specific game */}
          <Route path="/game/:gameid" element={<GameReviewsPage />} />

          {/* User reviews page */}
          <Route path="/user/:userid" element={<UserReviewsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrapper for GameReviews with dynamic gameid from URL params
const GameReviewsPage = () => {
  const { gameid } = useParams();
  return (
    <div>
      <h1>Game Reviews</h1>
      <ReviewForm gameid={gameid} userid={mockUser.id} currentUsername={mockUser.username} />
      <GameReviews gameid={gameid} />
    </div>
  );
};

// Wrapper for UserReviews with dynamic userid from URL params
const UserReviewsPage = () => {
  const { userid } = useParams();
  return (
    <div>
      <h1>User Reviews</h1>
      <UserReviews userid={userid} username={mockUser.username} />
    </div>
  );
}

export default RevImplementation;
