import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import '../styles/Friends.css';

const Friends = () => {
    const { user } = useAuthContext();
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch friends list
    useEffect(() => {
        const fetchFriends = async () => {
            if (!user) return;
            
            try {
                const response = await fetch('/api/friends', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                
                if (response.ok) {
                    setFriends(data.friends);
                } else {
                    setError(data.error);
                }
            } catch (err) {
                setError('Failed to fetch friends');
            }
        };
        
        fetchFriends();
    }, [user]);

    // Fetch friend requests
    useEffect(() => {
        const fetchRequests = async () => {
            if (!user) return;
            
            try {
                const response = await fetch('/api/friends/requests', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                
                if (response.ok) {
                    setRequests(data.requests);
                } else {
                    setError(data.error);
                }
            } catch (err) {
                setError('Failed to fetch friend requests');
            }
        };
        
        fetchRequests();
    }, [user]);

    // Search for users
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`/api/user/search?username=${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();
            
            if (response.ok) {
                setSearchResults(data.users);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Search failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Send friend request
    const sendFriendRequest = async (userId) => {
        if (!user) return;
        
        try {
            const response = await fetch('/api/friends/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ userId })
            });
            const data = await response.json();
            
            if (response.ok) {
                // Update UI to show pending request
                setSearchResults(prev => 
                    prev.map(u => u._id === userId ? {...u, requestSent: true} : u)
                );
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to send request');
        }
    };

    // Accept friend request
    const acceptRequest = async (userId) => {
        if (!user) return;
        
        try {
            const response = await fetch(`/api/friends/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ userId })
            });
            const data = await response.json();
            
            if (response.ok) {
                // Remove from requests and add to friends
                setRequests(prev => prev.filter(r => r._id !== userId));
                setFriends(prev => [...prev, data.user]);
                console.log("Still not crashed");
                console.log(friends);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to accept request');
        }
    };

    // Decline friend request
    const declineRequest = async (userId) => {
        if (!user) return;
        const data = await response.json();
        
        try {
            const response = await fetch(`/api/friends/decline`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ userId })
            });
            
            if (response.ok) {
                // Remove from requests
                setRequests(prev => prev.filter(r => r._id !== userId));
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to decline request');
        }
    };

    // Remove friend
    const removeFriend = async (userId) => {
        if (!user) return;
        
        try {
            const response = await fetch(`/api/friends/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            
            if (response.ok) {
                // Remove from friends list
                setFriends(prev => prev.filter(f => f._id !== userId));
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to remove friend');
        }
    };

    return (
        <div className="friends-container">
            <h1>Friends</h1>
            
            {/* Search for users */}
            <div className="search-section">
                <h2>Find Friends</h2>
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search by username"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </form>
                
                {error && <div className="error">{error}</div>}
                
                {searchResults.length > 0 && (
                    <div className="search-results">
                        <h3>Search Results</h3>
                        <div className="user-list">
                            {searchResults.map(userResult => (
                                <div key={userResult._id} className="user-card">
                                    <div className="user-info">
                                        <p className="username">{userResult.username}</p>
                                    </div>
                                    <div className="user-actions">
                                        {!userResult.isFriend && !userResult.requestSent && !userResult.requestReceived && (
                                            <button 
                                                onClick={() => sendFriendRequest(userResult._id)}
                                                className="add-btn"
                                            >
                                                Add Friend
                                            </button>
                                        )}
                                        {userResult.requestSent && (
                                            <span className="pending">Request Sent</span>
                                        )}
                                        {userResult.requestReceived && (
                                            <div>
                                                <button 
                                                    onClick={() => acceptRequest(userResult._id)}
                                                    className="accept-btn"
                                                >
                                                    Accept
                                                </button>
                                                <button 
                                                    onClick={() => declineRequest(userResult._id)}
                                                    className="decline-btn"
                                                >
                                                    Decline
                                                </button>
                                            </div>
                                        )}
                                        {userResult.isFriend && (
                                            <span className="friend-status">Friends</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Friend requests */}
            {requests.length > 0 && (
                <div className="requests-section">
                    <h2>Friend Requests</h2>
                    <div className="user-list">
                        {requests.map(request => (
                            <div key={request._id} className="user-card">
                                <div className="user-info">
                                    <p className="username">{request.username}</p>
                                </div>
                                <div className="user-actions">
                                    <button 
                                        onClick={() => acceptRequest(request._id)}
                                        className="accept-btn"
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        onClick={() => declineRequest(request._id)}
                                        className="decline-btn"
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Friends list */}
            <div className="friends-section">
                <h2>My Friends</h2>
                {friends.length === 0 ? (
                    <p className="no-friends">You haven't added any friends yet.</p>
                ) : (
                    <div className="user-list">
                        {friends.map(friend => (
                            <div key={friend._id} className="user-card">
                                <div className="user-info">
                                    <p className="username">{friend.username}</p>
                                </div>
                                <div className="user-actions">
                                    <button 
                                        onClick={() => removeFriend(friend._id)}
                                        className="remove-btn"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Friends;

