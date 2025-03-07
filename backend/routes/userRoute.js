import express from 'express';


// Controller functions.
import { signupUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// (POST) Login route.
router.post('/login', loginUser);

// (POST) Signup route.
router.post('/signup', signupUser);

export default router;