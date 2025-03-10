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
            {/* Button to toggle the Add List form */}
            <button
                onClick={() => setShowAddForm(!showAddForm)}
                style={{ marginBottom: '20px' }}
            >
                {showAddForm ? "Cancel" : "Add List"}
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
                    <button type="submit">Create</button>
                </form>
            )}

            {/* Display all lists */}
            <div>
                {lists.map((list) => (
                    <div
                        key={list._id}
                        onClick={() => onListClick(list)}
                        style={{ cursor: 'pointer', marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}
                    >
                        <h2>{list.category}</h2>
                        <p>{list.games.length} games</p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeListHandler(list._id);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListPage;