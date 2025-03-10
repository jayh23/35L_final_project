import express from 'express';


// Controller functions.
import { signupUser, loginUser, searchUsers, getUserUsername, getUserId } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile/:username', getUserUsername);
router.get('/:id', getUserId);

// (POST) Login route.
router.post('/login', loginUser);

// (POST) Signup route.
router.post('/signup', signupUser);

router.get('/search', searchUsers);


export default router;