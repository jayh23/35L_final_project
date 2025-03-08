import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";  // <-- import Link
import "../styles/Home.css";

const Home = () => {
  const [games, setGames] = useState([]);

  // References for the two carousels
  const trendingRef = useRef(null);
  const friendsRef = useRef(null);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch("/api/games");
      const data = await response.json();

      if (response.ok) {
        setGames(data.data);
      }
    };

    fetchGames();
  }, []);

  // Helper functions to scroll left/right
  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="home-container">

      {/* Trending Games */}
      <section className="trending-section">
        <h2>Trending Games</h2>

        <div className="carousel-container">
          {/* Left Arrow */}
          <button className="arrow-btn left" onClick={() => scrollLeft(trendingRef)}>
            &lt;
          </button>

          {/* Actual scrollable carousel */}
          <div className="carousel" ref={trendingRef}>
            {games.length > 0 ? (
              games.map((game) => (
                <Link to={`/games/${game._id}`} key={game._id} className="game-card">
                  <img src={game.image} alt={game.title} />
                  <p>{game.title}</p>
                </Link>
              ))
            ) : (
              <p>No trending games available.</p>
            )}
          </div>

          {/* Right Arrow */}
          <button className="arrow-btn right" onClick={() => scrollRight(trendingRef)}>
            &gt;
          </button>
        </div>
      </section>

      {/* Popular with Friends */}
      <section className="friends-section">
        <h2>Popular with Friends</h2>

        <div className="carousel-container">
          {/* Left Arrow */}
          <button className="arrow-btn left" onClick={() => scrollLeft(friendsRef)}>
            &lt;
          </button>

          {/* Actual scrollable carousel */}
          <div className="carousel" ref={friendsRef}>
            {games.length > 0 ? (
              games.map((game) => (
                <Link to={`/games/${game._id}`} key={game._id} className="game-card">
                  <img src={game.image} alt={game.title} />
                  <p>{game.title}</p>
                </Link>
              ))
            ) : (
              <p>No popular games with friends available.</p>
            )}
          </div>

          {/* Right Arrow */}
          <button className="arrow-btn right" onClick={() => scrollRight(friendsRef)}>
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
