import React, {useState} from "react";
import AddList from "./AddList";
import UserList from "./UserList";

//placeholder static data
const list = [
    {
        user: "jane doe",
        title: "favorites",
        description: "my favorite games",
        gameCount: 20
    },
    {
        user: "jane doe",
        title: "list 2",
        description: "my second list",
        gameCount: 11
    },
];

function ListPage()
{
    return (
        <div>
            <AddList />
            <UserList />
        </div>
    )
}
export default ListPage