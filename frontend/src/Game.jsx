import React from "react";
// import Review from ; // Mahima

const Tags = ({ tags }) => {
    function handleClick(e) {
        e.preventDefault();
        {/*Redirect to tag page?*/}
    }

    return (
        <>
            {tags.map((tags) => (
                <button onClick={this.handleClick}>{tags}</button>
            ))}
        </>
    );
}

const Game = () => {
    // Everything placeholder
    // game.model has title, date, genre, image
    
    let title = "GAME TITLE";
    let cover = "COVER IMAGE";
    let rating = 5.0;
    let date = 1850;
    let genre = ["GENRE_1", "GENRE_2", "GENRE_3"];
    let desc = "DESCRIPTION";
    return (
        <>
            <body>
            <div class="info">
                <h1>{title}</h1>
                    <image src={`${cover}`} />
                    <p>Rating: {rating}</p> {/* Would be cool to display rating in stars*/}
                <p>Release date: {date}</p>
                    <p>Tags: </p>
                    <Tags tags={genre} />
                {/*Not sure yet how to display variable length tag list.
                    May require making a new element type (<tag /> ?) */}
                <p>{desc}</p>
                </div>
                {/* <Review /> */}
            </body>
        </>
    );
}

export default Game;