import React from "react";

function calculateScore(gameID) {
    // Must somehow collect review data from database
    let reviewDB = [[]]; //pretend this has reviews
    let score = 0;
    let count = 0;
    for (const item of reviewDB) {
        if (gameID === item.gameid) { // fix format if not indexed
            score += item.rating;
            count++;
        }
    }
    return score / count;
}


function Game() {
    // Everything placeholder
    // game.model has title, date, genre, image
    let title = "GAME TITLE";
    let cover = "COVER IMAGE";
    let date = 1850;
    let genre = ["GENRE_1", "GENRE_2", "GENRE_3"];
    let desc = "DESCRIPTION";
    return (
        <>
            <body>
            <div class="info">
                <h1>{title}</h1>
                <image src={`${cover}`} />
                <p>Release date: {date}</p>
                <p>Tags: {genre}</p>
                {/*Not sure yet how to display variable length tag list.
                    May require making a new element type (<tag /> ?) */}
                <p>{desc}</p>
                </div>
                <div class="reviews">
                    <h2>User Reviews</h2>
                <></>
                </div>
            </body>
        </>
    );
}

export default Game;