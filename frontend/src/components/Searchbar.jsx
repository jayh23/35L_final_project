import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"

const Searchbar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    }
    return (
        <form onSubmit={handleSearch}>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    );
};

export default Searchbar;