import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../styles/listIndex.css";

const ListCard = (props) => {
    const { _id, category, games, privacy } = props.list;
    const [showGames, setShowGames] = useState(false);
    const [listGames, setListGames] = useState([]);
{/*
    const fetchGames = async () => {
        try {
            const response = await fetch(`/api/lists/${_id}/games`, {
                headers: {
                    'Authorization': `Bearer ${props.user.token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setListGames(data.data);
                setShowGames(!showGames); // Toggle visibility of games
            }
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    };
    */}

    return (
        <div className="item" style={{ marginLeft: '20px', minWidth: '200px' }}>
            <div className="content">
                <div
                    onClick={fetchGames}
                    style={{ cursor: 'pointer' }} 
                >
                    <div className="header" style={{ fontSize: "20px", fontWeight: "bold", marginTop: "10px" }}>
                        {category} {/* Use category as the "title" */}
                    </div>
                    <div style={{ fontSize: "14px", color: "#bbb" }}>
                        {games.length} games 
                    </div>
                    <div style={{ fontSize: "14px", color: "#bbb" }}>
                        {privacy ? "Private" : "Public"} 
                    </div>
                </div>

                {showGames && (
                    <div className="games-list">
                        {listGames.map((game) => (
                            <div key={game._id} style={{ marginTop: '10px' }}>
                                <img src={game.image} alt={game.title} style={{ width: '50px', height: '50px' }} />
                                <p>{game.title}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <i
                className="fa-solid fa-trash"
                style={{ color: "gray", marginTop: "7px", cursor: "pointer" }}
                onClick={() => props.clickHandler(_id)}
            ></i>
        </div>
    );
};

export default ListCard;