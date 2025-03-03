import React, { useEffect, useState, useRef } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
// import Review from ; // Mahima

const Tags = ({ tags }) => {
    const handleClick = (tag) => {
        // Redirect to genre page. Might not end up using this
        window.location.href = `/genre/${tag}`;
    };

    return (
        <>
            {tags.map((tag, index) => (
                <button key={index} onClick={() => handleClick(tag)} className="tag">{tag}</button>
            ))}
        </>
    );
};

const addList = () => {
    const [game, setGame] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5001/api/`)
            .then((res) => res.json())
            .then((data) => setGame(data))
            .catch((err) => console.error("Error fetching game:", err));
    }, []);
}

const Game = (gameId) => {
    const [game, setGame] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5001/api/games/${gameId}`)
            .then((res) => res.json())
            .then((data) => setGame(data))
            .catch((err) => console.error("Error fetching game:", err));
    }, [gameId]);

    const handleClick = (listType) => {
        // listType should be 0 or 1
        if (listType != 0 && listType != 1) console.err("Invalid list type");
        // TODO: Use add-to-list function
    }

    
    return (
        <>
            <body>
                <div className="leftcol">
                    <image src={game.image} />
                    <p>Release date: {game.year}</p>
                    {/* Would be cool to display rating in stars*/}
                    <p>Rating: {Math.round(game.sumrating / game.reviews)}</p>
                    {/* Not sure what to do about these */}
                    <button onClick={() => handleClick(0)}>Add to library</button>
                    <button onClick={() => handleClick(1)}>Add to favorites</button>
                    <></>
                </div>
                <div className="rightcol">
                    <h1>{game.title}</h1>
                    <div className="scroll">
                    <Tags tags={game.genre} />
                    <p>{game.description}</p>
                    {/* <Review /> */}
                    </div>
                </div>
            </body>
        </>
    );
}

export default Game;