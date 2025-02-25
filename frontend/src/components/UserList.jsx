import React from "react";
import ListCard from "./ListCard"

const UserList = (props) =>{
    console.log(props);
    
    const renderUserList = props.lists.map((list) =>{
        return(
            <ListCard list={list}> </ListCard>
        );

    });
    return(
        <div>{renderUserList}</div>
    );

};

export default UserList;