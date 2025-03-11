import express from 'express';
import upload from '../middleware/multerConfig.js'

// Controller functions.
import { signupUser, loginUser, searchUsers, updateAvatar} from '../controllers/userController.js';

const router = express.Router();

// (POST) Login route.
router.post('/login', loginUser);

// (POST) Signup route.
router.post('/signup', signupUser);

// (GET) Search route
router.get('/search', searchUsers);

// (PATCH) File upload route
router.patch("/upload-avatar", upload.single("file"), updateAvatar);

export default router;