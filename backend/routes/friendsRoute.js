import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import {
  getFriends,
  getFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend
} from '../controllers/friendsController.js';

const router = express.Router();

// Protect all friend routes with authentication middleware.
router.use(requireAuth);

// Route to get the current user's friend list.
router.get('/', getFriends);

// Route to get the current user's friend requests.
router.get('/requests', getFriendRequests);

// Route to send a friend request.
router.post('/request', sendFriendRequest);

// Route to accept a friend request.
router.post('/accept', acceptFriendRequest);

// Route to decline a friend request.
router.post('/decline', declineFriendRequest);

// Route to remove a friend.
router.delete('/:userId', removeFriend);

export default router;
