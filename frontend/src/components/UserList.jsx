import React from "react";
import {Link} from "react-router-dom";
import ListCard from "./ListCard.jsx";

const UserList = (props) =>{
    console.log(props);

    const deleteListHandler = (id) => {
        props.getListId(id);
    };


    const renderUserList = props.lists.map((list) => {
        return (
            <ListCard 
                list={list} 
                clickHandler={deleteListHandler} 
                key={list.id} 
            />
        );
    });
    return (
    <div className="main">
        <div className="list-header">
            <h2>Game Lists</h2>
            <Link to="/add">
                <button className="ui button">+ Add a List</button>
            </Link>
        </div>
        <div className="ui celled list">{renderUserList}</div>
    </div>
    );
};

export default UserList;