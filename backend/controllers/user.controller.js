import User from '../models/user.model.js';

// login user
export const loginUser = async (req, res) => {
    res.json({ message: 'login user' });
}

// signup user

export const signupUser = async (req, res) => {
    res.json({ message: 'signup user' });
}