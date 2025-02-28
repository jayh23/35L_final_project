import React from "react";
import ListCard from "./ListCard.jsx";

const UserList = (props) =>{
    console.log(props);
    
    const renderUserList = props.lists.map((list, index) => {
        return <ListCard key={list.id || index} list={list} />

    });
    return <div>{renderUserList}</div>

};

export default UserList;