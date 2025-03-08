import mongoose from 'mongoose';

import List from '../models/listModel.js';

// Get one game list.
export const getList = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid list id." });
    }

    try {
        // Find the current user id.
        const userId = req.user._id;

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

        const newList = await List.create({ ...req.body, userId: userId });

        res.status(200).json({ data: newList });
    } catch (error) {
        console.error("Error in creating list:", error.message);
        res.status(500).json({ error: "Server Error" });
    }
};

// Update a list.
export const updateList = async (req, res) => {
    const { id } = req.params;
    const { game } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid list id." });
    }

    try {
        const updatedList = await List.findByIdAndUpdate(
            { _id: id }, 
            { $addToSet: { games: game }},
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