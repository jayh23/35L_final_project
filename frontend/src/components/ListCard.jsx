import React from 'react';
import {Link} from "react-router-dom";

const ListCard = (props) => {
    const {id, title, description, image} = props.list;

    const staticImage = "https://via.placeholder.com/350x200"; 

    return(
        <>
            <div className="item">
                {/* static image for now, draw from backend later* (latest added game*/}
                <img 
                    src={image || staticImage}  
                    className="list-image" 
                    style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px"
                    }}
                />
                <div className="content">
                    <Link to={'/list/$(id)'}>
                        <div className="header" style={{ fontSize: "20px", fontWeight: "bold", marginTop: "10px" }}>
                            {title}
                        </div>
                        <div style={{ fontSize: "14px", color: "#bbb" }}>{description}</div>
                    </Link>
                </div>
                <i
                    className="fa-solid fa-trash"
                    style={{ color: "gray", marginTop: "7px", cursor: "pointer" }}
                    onClick = {() => props.clickHandler(id)}
                ></i>
            </div>
        </>

    );
};

export default ListCard;
