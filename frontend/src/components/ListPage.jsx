
import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import "../styles/listIndex.css";
import AddList from './AddList';



const ListPage = ({  addListHandler, removeListHandler}) => {
    const { user } = useAuthContext();
    const [showAddForm, setShowAddForm] = useState(false);
    const [newList, setNewList] = useState({ category: '', privacy: false });



    const handleAddList = async (e) => {
        e.preventDefault();
        
        const createdList = await addListHandler(newList); // Ensure this function returns the new list from the backend
        
        if (createdList) {
            setNewList({ category: '', privacy: false });
            setShowAddForm(false);
        }
    };
    

    return (
        <div>
            {!showAddForm && (
                
                <button
                onClick={() => setShowAddForm(true)}
                className="ui button primary"
                style={{ marginBottom: "20px" }}
            >
                Add List
            </button>
        )}

            {/* Add List Form */}
            {/* {showAddForm && (
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
            )} */}

                {showAddForm && (
                <AddList 
                    addListHandler={addListHandler} 
                    onCancel={() => setShowAddForm(false)} 
                />
            )}

        </div>
    );
};

export default ListPage;

