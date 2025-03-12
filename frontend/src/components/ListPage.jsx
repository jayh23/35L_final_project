
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

