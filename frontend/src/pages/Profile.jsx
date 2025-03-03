import { useEffect, useState } from 'react';

const Profile = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch('/api/games');
            const data = await response.json();
            
            if (response.ok) {
                setGames(data.data);
            }
        }

        fetchGames();
    }, []);
    console.log(games);
    return (
        <>
            <h1>Profile</h1>
            <p>Welcome to the Profile page.</p>
            <div className="games">
                {games.map((game) => (
                    <div key={game._id}>
                        <h2>{game.title}</h2>
                        <p>{game.year}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Profile;