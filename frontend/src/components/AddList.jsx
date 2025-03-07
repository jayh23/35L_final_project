import React from 'react';
import { Navigate } from './Navigate'; 

class AddList extends React.Component{
    state = {
        title: "",
        description: "",
    };

    add = (e) => {
        e.preventDefault();
        if(this.state.title === "" || this.state.description === ""){
            alert("All fields are mandatory");
            return;
        }
        this.props.addListHandler(this.state);
        this.setState({title: "", description: ""});
        this.props.navigate("/");
    };

    render(){
        return(
            <div className="ui main">
                <h2> Create a New List!</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="Title" 
                            value={this.state.title}
                            onChange={(e) => this.setState({title: e.target.value})}
                        />
                    </div>
                    <div className="field">
                        <label>Description</label>
                        <input 
                            type="text" 
                            name="description" 
                            placeholder="Description" 
                            value={this.state.description}
                            onChange={(e) => this.setState({description: e.target.value})}
                        />
                    </div>
                    <button>Create</button>
                </form>
            </div>
        );
    }

}
export default Navigate(AddList);