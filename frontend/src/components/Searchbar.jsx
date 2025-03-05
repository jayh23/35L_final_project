import React, { useEffect, useState, useRef } from "react";

const Searchbar = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        // Redirect to search results page with query as input
    }
    return (
        <form onSubmit={handleSearch}>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        </form>
    );
};

export default Searchbar;