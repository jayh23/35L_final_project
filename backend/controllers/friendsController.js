import User from '../models/userModel.js';

// Get the authenticated user's friends
export const getFriends = async (req, res) => {
  try {
    // Find the current user
    const currentUser = await User.findById(req.user._id);
    // Fetch details of all users whose ids are in the friends array
    const friends = await User.find({ _id: { $in: currentUser.friends } }).select('username avatar');
    res.status(200).json({ friends });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the authenticated user's friend requests
export const getFriendRequests = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    // Fetch details of all users who have sent a friend request
    const requests = await User.find({ _id: { $in: currentUser.friendRequests } }).select('username avatar');
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send a friend request to another user
export const sendFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body; // target user id to whom the friend request is sent

    // Prevent sending a request to yourself
    if (req.user._id.toString() === userId) {
      return res.status(400).json({ error: "You cannot send a friend request to yourself." });
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if they are already friends
    if (targetUser.friends.includes(req.user._id.toString())) {
      return res.status(400).json({ error: "You are already friends." });
    }

    // Check if a friend request has already been sent
    if (targetUser.friendRequests.includes(req.user._id.toString())) {
      return res.status(400).json({ error: "Friend request already sent." });
    }

    // Add the current user's ID to the target user's friendRequests array
    targetUser.friendRequests.push(req.user._id.toString());
    await targetUser.save();

    res.status(200).json({ message: "Friend request sent." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept a friend request
export const acceptFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body; // the user who sent the friend request
    const currentUser = await User.findById(req.user._id);

    // Check if there is a pending friend request from that user
    if (!currentUser.friendRequests.includes(userId)) {
      return res.status(400).json({ error: "No friend request from that user." });
    }

    // Remove the request and add the user to the friends list
    currentUser.friendRequests = currentUser.friendRequests.filter(id => id !== userId);
    currentUser.friends.push(userId);
    await currentUser.save();

    // Also add the current user to the sender's friends list
    const senderUser = await User.findById(userId);
    senderUser.friends.push(req.user._id.toString());
    await senderUser.save();

    res.status(200).json({ message: "Friend request accepted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Decline a friend request
export const declineFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body; // the user who sent the friend request
    const currentUser = await User.findById(req.user._id);

    if (!currentUser.friendRequests.includes(userId)) {
      return res.status(400).json({ error: "No friend request from that user." });
    }

    // Simply remove the friend request
    currentUser.friendRequests = currentUser.friendRequests.filter(id => id !== userId);
    await currentUser.save();

    res.status(200).json({ message: "Friend request declined." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a friend
export const removeFriend = async (req, res) => {
  try {
    const { userId } = req.params; // friend to remove
    const currentUser = await User.findById(req.user._id);

    if (!currentUser.friends.includes(userId)) {
      return res.status(400).json({ error: "User is not in your friends list." });
    }

    // Remove the friend from the current user's list
    currentUser.friends = currentUser.friends.filter(id => id !== userId);
    await currentUser.save();

    // Optionally, remove the current user from the friend's list
    const friendUser = await User.findById(userId);
    if (friendUser) {
      friendUser.friends = friendUser.friends.filter(id => id !== req.user._id.toString());
      await friendUser.save();
    }

    res.status(200).json({ message: "Friend removed." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
