import React, {useState} from "react";
import AddList from "./AddList.jsx";
import UserList from "./UserList.jsx";

//placeholder static data
/*const list = [
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
*/

function ListPage(){
    const [lists, setLists] = useState([]);

    const addListHandler = (list) => {
        console.log(list);
    };

    return (
        <div>
            <AddList addListHandler={addListHandler} />
            <UserList lists={lists} />
        </div>
    );
}
export default ListPage;