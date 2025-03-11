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
        this.setState({ category: "", privacy: false });
    };

    render() {
        return (
            <div className="ui main">
                <h2>Create a New List!</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={this.state.category}
                            onChange={(e) => this.setState({ category: e.target.value })}
                        />
                    </div>
                    <div className="field">
                        <label>Privacy</label>
                        <select
                            name="privacy"
                            value={this.state.privacy}
                            onChange={(e) => this.setState({ privacy: e.target.value === "true" })}
                        >
                            <option value="false">Public</option>
                            <option value="true">Private</option>
                        </select>
                    </div>
                    <button type="submit">Create</button>
                    <button
                        type="button"
                        onClick={this.props.onCancel}
                        className="ui button"
                        style={{ marginLeft: "10px" }}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        );
    }
}

export default AddList;