import express from 'express';


// Controller functions.
import { signupUser, loginUser, searchUsers, getUserUsername, getUserId, updateAvatar} from '../controllers/userController.js';

// const express = require('express');
const router = express.Router();
import auth from '../middleware/requireAuth.js';
import upload from '../middleware/upload.js'

//router.get('/profile/:username', getUserUsername);
//router.get('/profile/:id', getUserId);

router.get('/profile', (req, res) => {
    if (req.query.username) {
        return getUserUsername(req, res);
    } else if (req.query.id) {
        return getUserId(req, res);
    }
});


// (POST) Login route.
router.post('/login', loginUser);

// (POST) Signup route.
router.post('/signup', signupUser);

router.get('/search', searchUsers);

router.put('/avatar', auth, upload.single('avatar'), updateAvatar);


export default router;