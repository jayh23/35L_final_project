import React from "react";
import {Link} from "react-router-dom";
import ListCard from "./ListCard.jsx";
import "../styles/listIndex.css";


const UserList = ({ lists, addListHandler, removeListHandler }) =>{
   // console.log(props);
    const deleteListHandler = (id) => {
        props.getListId(id);
    };


    const renderUserList = lists.map((list) => {
        return (
            <ListCard 
                list={list} 
                clickHandler={deleteListHandler} 
                key={list._id} 
            />
        );
    });
    return (
    <div className="main">
        <div className="list-header">
            <h2>Game Lists</h2>
        </div>
        <div className="ui celled list">{renderUserList}</div>
    </div>
    );
};

export default UserList;