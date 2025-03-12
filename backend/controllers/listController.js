import mongoose from 'mongoose';

import List from '../models/listModel.js';
import User from '../models/userModel.js';

// Get all game lists for a specific user.
export const getLists = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        // Find lists associated with the current user.
        const lists = await List.find({ userId: user._id });

        res.status(200).json({ data: lists });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get one game list for a specific user.
export const getList = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid list id." });
    }

    try {
        const user = await User.findOne({ username });

        // Find lists associated with the current user.
        const list = await List.findOne({ _id: id, userId: userId });

        res.status(200).json({ data: list });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new list.
export const createList = async (req, res) => {

    // Add list to database.
    try {
        // Find the current user id.
        const userId = req.user._id;

        const newList = await List.create({ userId: userId, ...req.body });

        res.status(200).json({ data: newList });
    } catch (error) {
        console.error("Error in creating list:", error.message);
        res.status(500).json({ error: "Server Error" });
    }
};

// Add a game to a list.
export const addGameToList = async (req, res) => {
    const { id } = req.params;
    const { games } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid list id." });
    }

    try {
        const updatedList = await List.findByIdAndUpdate(
            { _id: id }, 
            { $addToSet: { games: { $each: games } }},
            { new: true }
        );

        res.status(200).json({ data: updatedList });
    } catch (error) {
        console.error("Error in updating list:", error.message);
        res.status(500).json({ error: "Server Error" });
    }
};

// Remove a game from a list.
export const removeGameFromList = async (req, res) => {
    const { id } = req.params;
    const { games } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid list id." });
    }

    try {
        const updatedList = await List.findByIdAndUpdate(
            { _id: id }, 
            { $pull: { games: { $in: games } }},
            { new: true }
        );

        res.status(200).json({ data: updatedList });
    } catch (error) {
        console.error("Error in updating list:", error.message);
        res.status(500).json({ error: "Server Error" });
    }
};

// Delete a list.
export const deleteList = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid list id." });
    }

    const list = await List.findById(id);
    if (!list) {
        return res.status(404).json({ error: "List not found." });
    }

    // Prevent deletion if the list is "favorites" or "owned".
    if (list.category === "favorites" || list.category === "owned") {
        return res.status(400).json({ error: "Cannot delete default list." });
    }

    try {
        const deletedList = await List.findByIdAndDelete(id);

        res.status(200).json({ data: deletedList });
    } catch (error) {
        console.error("Error in deleting list:", error.message);
        res.status(500).json({ error: "Server Error" });

    }
};