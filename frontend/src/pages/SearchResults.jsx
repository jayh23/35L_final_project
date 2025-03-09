// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import "../styles/SearchResults.css";

// const SearchResults = () => {
//   const [games, setGames] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchParams] = useSearchParams();
  
//   // Get the search term from the query parameter: ?q=...
//   const query = searchParams.get('q') || '';

//   useEffect(() => {
//     // Only attempt a fetch if there's a non-empty query
//     if (!query.trim()) {
//       setGames([]); 
//       return;
//     }

//     const fetchResults = async () => {
//       try {
//         const response = await fetch(`/api/games/search?q=${encodeURIComponent(query)}`);
//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || 'Failed to fetch search results');
//         }

//         // Assuming your backend returns { data: [...] }
//         setGames(data.data || data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchResults();
//   }, [query]);

//   if (error) {
//     return <p style={{ color: 'red' }}>Error: {error}</p>;
//   }

//   return (
//     <div>
//       <h2>Search Results for "{query}"</h2>
//       <div className="game-grid">
//         {games.length > 0 ? (
//           games.map((g) => (
//             <div key={g._id} className="game-card">
//               <img src={g.image} alt={g.title} />
//               <p>{g.title}</p>
//             </div>
//           ))
//         ) : (
//           <p>No results found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;

import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import "../styles/SearchResults.css";

const SearchResults = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  
  // Get the search term from the query parameter: ?q=...
  const query = searchParams.get('q') || '';

  useEffect(() => {
    // Only attempt a fetch if there's a non-empty query
    if (!query.trim()) {
      setGames([]); 
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/games/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch search results');
        }

        // Assuming your backend returns { data: [...] }
        setGames(data.data || data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchResults();
  }, [query]);

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      <div className="game-grid">
        {games.length > 0 ? (
          games.map((g) => (
            <Link key={g._id} to={`/games/${g._id}`} className="game-card">
              <img src={g.image} alt={g.title} />
              <p>{g.title}</p>
            </Link>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
