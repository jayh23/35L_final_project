import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [games, setGames] = useState([]);
  const [trendingGames, setTrendingGames] = useState([]);
  const [popularWithFriends, setPopularWithFriends] = useState([]);

  useEffect(() => {
    // Fetch all games from the database
    fetch("http://localhost:5000/api/games") // General endpoint
      .then((res) => res.json())
      .then((data) => {
        setGames(data);

        // Select first 5 for trending games
        setTrendingGames(data.slice(0, 5));

        // Select next 5 for popular with friends (if there are enough games)
        setPopularWithFriends(data.slice(5, 10));
      })
      .catch((err) => console.error("Error fetching games:", err));
  }, []);

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1>GameBoxd</h1>
        <div className="nav-links">
          <a href="/search">Search</a>
          <a href="/friends">Friends</a>
          <a href="/profile">Profile</a>
        </div>
      </nav>

      {/* Trending Games */}
      <section className="trending-section">
        <h2>Trending Games</h2>
        <div className="game-list">
          {trendingGames.length > 0 ? (
            trendingGames.map((game) => (
              <div key={game._id} className="game-card">
                <img src={game.image} alt={game.title} />
                <p>{game.title}</p>
              </div>
            ))
          ) : (
            <p>No trending games available.</p>
          )}
        </div>
      </section>

      {/* Popular with Friends */}
      <section className="friends-section">
        <h2>Popular with Friends</h2>
        <div className="game-list">
          {popularWithFriends.length > 0 ? (
            popularWithFriends.map((game) => (
              <div key={game._id} className="game-card">
                <img src={game.image} alt={game.title} />
                <p>{game.title}</p>
              </div>
            ))
          ) : (
            <p>No popular games with friends available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
