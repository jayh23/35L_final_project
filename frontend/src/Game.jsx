import React, { useEffect, useState, useRef } from "react";
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

const Game = (gameId) => {
    const [game, setGame] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5001/api/games/${gameId}`)
            .then((res) => res.json())
            .then((data) => setGame(data))
            .catch((err) => console.error("Error fetching game:", err));
    }, [gameId]);

    
    return (
        <>
            <body>
                <div className="info">
                    <h1>{game.title}</h1>
                    <image src={game.image} />
                    <p>Rating: {game.rating}</p> {/* Would be cool to display rating in stars*/}
                    <p>Release date: {game.year}</p>
                    <p>Tags: </p>
                    <Tags tags={game.genre} />
                    <p>{game.description}</p>
                </div>
                {/* <Review /> */}
            </body>
        </>
    );
}

export default Game;