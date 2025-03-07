import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom"

const SearchResults = () => {
    const [games, setGames] = useState([]); // Get the games from the query somehow
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        if (query) {
            searchDatabase(query).then((data) => setResults(data));
        }
    }, [query]);

    return (
        <div>
            {/* Stolen from homepage. Thanks Sid! */}
            <div className="results">
                <h1>Search results for {query}</h1>
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