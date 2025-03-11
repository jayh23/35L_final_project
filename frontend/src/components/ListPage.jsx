// import React, {useState, useEffect} from "react";
// import { v4 as uuid } from "uuid"
// import AddList from "./AddList.jsx";
// import UserList from "./UserList.jsx";
// import Header from "./Header.jsx";
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// const testData = [

// ]

// function ListPage(){
//     const LOCAL_STORAGE_KEY = "lists";
//     const [lists, setLists] = useState([]);

//     const addListHandler = (list) => {
//         console.log(list);
//         setLists([...lists, {id: uuid(), ...list }]);

//     };

//     const removeListHandler = (id) => {
//         const newUserList = lists.filter((list) => {
//             return list.id !== id;
//         });
 
//         setLists(newUserList);
//     };

//     useEffect(() => {
//         localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lists));
//     }, [lists]);

//     useEffect(()=>{
//         const getLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY, JSON.stringify(lists)));
//         if(getLists) setLists(getLists);
//     }, []);

//     return (
//         <div className="ui container">
//             <Router>
//                 <Header />
//                 <Routes>
//                     <Route path="/" element={<UserList lists={lists} getListId={removeListHandler}/>} />
//                     <Route path="/add" element={<AddList addListHandler={addListHandler} />}/>
//                 </Routes>
//             </Router>
//         </div>
//     );
// }
// export default ListPage;



import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import "../styles/listIndex.css";


const ListPage = ({ lists = [], addListHandler, removeListHandler, onListClick }) => {
    const { user } = useAuthContext();
    const [showAddForm, setShowAddForm] = useState(false);
    const [newList, setNewList] = useState({ category: '', privacy: false });

    // Handle form submission for adding a new list
    const handleAddList = (e) => {
        e.preventDefault();
        addListHandler(newList);
        setNewList({ category: '', privacy: false });
        setShowAddForm(false);
    };

    return (
        <div>
            <button
                onClick={() => setShowAddForm(!showAddForm)}
                style={{ marginBottom: '20px' }}
                className="ui button"
            >
                {showAddForm ? "Cancel" : "Add Game List"}
            </button>

            {/* Add List Form */}
            {showAddForm && (
                <form onSubmit={handleAddList}>

                    <div>
                        <label>Category</label>
                        <input
                            type="text"
                            placeholder="Category"
                            value={newList.category}
                            onChange={(e) => setNewList({ ...newList, category: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Privacy</label>
                        <select
                            value={newList.privacy}
                            onChange={(e) => setNewList({ ...newList, privacy: e.target.value === 'true' })}
                        >
                            <option value="false">Public</option>
                            <option value="true">Private</option>
                        </select>
                    </div>
                    <button 
                        type="submit"
                        className="ui button primary">
                        Create List!</button>
                </form>
            )}

        </div>
    );
};

export default ListPage;

