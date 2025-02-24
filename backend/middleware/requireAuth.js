import jwt from 'jsonwebtoken';

import User from '../models/userModel';

const requireAuth = async (req, res, next) => {
    // Get the authorization header from the request.
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required.' });
    }

    // Extract the token from the "Bearer <token>" format.
    const token = authorization.split(' ')[1];

    try {
        // Verify the token using the secret key stored in environment variables.
        // This decodes the token and retrieves the user ID (_id).
        const { _id } = jwt.verify(token, process.env.SECRET);

        // Use the user ID (_id) to find the user in the database.
        // Only select the _id field for performance reasons.
        req.user = await User.findOne({ _id }).select('_id');
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
}

export default requireAuth;