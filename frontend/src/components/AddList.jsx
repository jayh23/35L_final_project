import React from 'react';
import '../styles/listIndex.css';

class AddList extends React.Component {
    state = {
        category: "", 
        privacy: false, 
    };

    add = (e) => {
        e.preventDefault();
        if (this.state.category === "") {
            alert("Category is mandatory");
            return;
        }
        this.props.addListHandler(this.state);
        this.setState({ category: "", privacy: true });
        this.props.onCancel();
    };

    render() {
        return (
            <div className="ui main add-list-container">
                <h2 className="add-list-title">Create a New List!</h2>
                <form className="ui form add-list-form" onSubmit={this.add}>
                    <div className="field">
                        <label style={{ fontWeight: "bold" }}>Category</label>
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={this.state.category}
                            onChange={(e) => this.setState({ category: e.target.value })}
                        />
                    </div>
                    {/*<div className="field">
                        <label style={{ fontWeight: "bold" }}>Privacy:</label>
                        <select
                            name="privacy"
                            value={this.state.privacy}
                            onChange={(e) => this.setState({ privacy: e.target.value === "true" })}
                        >
                            <option value="false">Public</option>
                            <option value="true">Private</option>
                        </select>
                    </div>*/}
                    <div className="button-group">
                        <button 
                            type="submit" 
                            className="create-button"
                            >
                                Create
                        </button>
                        <button
                            type="button"
                            className ="delete-button"
                            onClick={this.props.onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddList;