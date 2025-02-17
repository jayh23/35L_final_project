import User from '../models/user.model.js';

// login user
export const loginUser = async (req, res) => {
    res.json({ message: 'login user' });
}

// signup user
export const signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.signup(username, email, password);
        res.status(200).json({ username, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

    res.json({ message: 'signup user' });
}