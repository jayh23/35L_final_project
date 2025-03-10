import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useGameService } from '../../services/gameService';

import '../../styles/Profile.css';

const ProfileReview = ({ review, deletable, onDelete }) => { // Added deletable and onDelete props
    const { getGame } = useGameService();

    const [game, setGame] = useState({});

    useEffect(() => {
        getGame(review.gameId).then(setGame);
    }, [review.gameId]);

    return (
        <Link to={`/games/${game._id}`} className="profile-review flex items-start gap-4 p-2">
            {/* Game Image */}
            <img src={game.image} className="w-15 object-cover" alt={game.title} />
        
            {/* Review Content */}
            <div className="flex flex-col flex-1">
                {/* Title and Rating */}
                <h3 className="text-lg font-semibold text-white">{game.title}</h3>
                <span className="text-yellow-400 font-bold">
                    {'★'.repeat(Math.floor(review.rating))}
                </span>
                {/* Review Text */}
                <p className="text-gray-300 text-sm">{review.text}</p>
                {/* Conditionally render the delete button if deletable */}
                {deletable && (
                    <button 
                        onClick={(e) => {
                            e.preventDefault(); // Prevent the Link navigation
                            e.stopPropagation(); // Stop the event from bubbling up
                            onDelete(review._id);
                        }}
                        className="delete-review-button"
                    >
                        Delete
                    </button>
                )}
            </div>
        </Link>
    );
};

export default ProfileReview;
