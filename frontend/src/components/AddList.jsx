import React from 'react';
class AddList extends React.Component{
    render(){
        return(
            <div>
                <h2> Create a New List!</h2>
                <form>
                    <div>
                        <label>Title</label>
                        <input type="text" name="title" placeholder="Title"/>
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" name="description" placeholder="Description"/>
                    </div>
                    <button>Create</button>
                </form>
            </div>
        )
    }

}
export default AddList;