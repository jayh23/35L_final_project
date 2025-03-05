import React, { useEffect, useState } from 'react';

const SearchResults = () => {
    const [games, setGames] = useState([]); // Get the games from the query somehow

    return (
        <div>
            {/* Stolen from homepage. Thanks Sid! */}
            <div className="results">
                {games.length > 0 ? (
                    games.map((game) => (
                        <div key={game._id} className="game-card">
                            <img src={game.image} alt={game.title} />
                            <p>{game.title}</p>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;