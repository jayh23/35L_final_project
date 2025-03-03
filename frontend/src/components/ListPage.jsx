import React, {useState, useEffect} from "react";
import { v4 as uuid } from "uuid"
import AddList from "./AddList.jsx";
import UserList from "./UserList.jsx";
import Header from "./Header.jsx";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const testData = [

]


function ListPage(){
    const LOCAL_STORAGE_KEY = "lists";
    const [lists, setLists] = useState([]);

    const addListHandler = (list) => {
        console.log(list);
        setLists([...lists, {id: uuid(), ...list }]);

    };

    const removeListHandler = (id) => {
        const newUserList = lists.filter((list) => {
            return list.id !== id;
        });
 
        setLists(newUserList);
    };

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lists));
    }, [lists]);

    useEffect(()=>{
        const getLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY, JSON.stringify(lists)));
        if(getLists) setLists(getLists);
    }, []);

    return (
        <div className="ui container">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<UserList lists={lists} getListId={removeListHandler}/>} />
                    <Route path="/add" element={<AddList addListHandler={addListHandler} />}/>
                </Routes>
            </Router>
        </div>
    );
}
export default ListPage;