import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Helper function to create a JWT token with a user ID and an expiration time of 3 days.
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}



// Login user.
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Attempt to find and authenticate the user with the provided credentials.
        const user = await User.login(username, password);
      
        // If authentication is successful, create a JWT token for the user.
        const token = createToken(user._id);
        console.log(token); 

        // Send a response with the username and generated token.
        res.status(200).json({ username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Signup user.
export const signupUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Attempt to create a new user by calling the signup method in the User model.
        const user = await User.signup(username, password);
       
        // If signup is successful, create a JWT token for the new user.
        const token = createToken(user._id);

        // Send a response with the username and generated token.
        res.status(200).json({ username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const searchUsers = async (req, res) => {
    const { username } = req.query;
    
    // If username query is missing or blank, return an empty list
    if (!username || username.trim() === "") {
      return res.status(200).json({ users: [] });
    }
  
    try {
      // Find users whose username contains the input string (case-insensitive)
      const users = await User.find({
        username: { $regex: username, $options: 'i' }
      }).select('username');
  
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  