import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useGameService } from '../../services/gameService';

import '../../styles/Profile.css';

function toTitleCase(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

const ProfileGameList = ({ list }) => {
    const { getGame } = useGameService();

    const [games, setGames] = useState([]);

    // Get a list of game objects using the list of game IDs.
    useEffect(() => {
        Promise.all(
            list.games.map((gameId) => getGame(gameId))
        ).then(setGames);
    }, [list.games]);

    return (
        
        <div className="profile-list-card">
            <div className="text-base pb-1">{toTitleCase(list.category)}</div>
            
            {/* Conditional rendering for empty games list */}
            {games.length === 0 ? (
                <div className="text-center text-gray-500 text-left text-sm">
                    No games added to this list.
                </div>
            ) : (
                <div className="flex flex-row justify-start gap-2 overflow-x-auto">
                    {games.map((game) => (
                        <Link to={`/games/${game._id}`} key={game._id}>
                            <div className="relative flex flex-col items-center gap-2 group">
                                <img src={game.image} className="w-25 object-cover" alt={game.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100"></div>
                                <span className="absolute inset bottom-0 text-wrap text-xs text-center opacity-0 group-hover:opacity-100">{game.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProfileGameList;