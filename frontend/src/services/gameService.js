export const useGameService = () => {
    const getGame = async (id) => {
        try {
            const response = await fetch(`/api/games/${id}`);
            const data = await response.json();
    
            if (response.ok) {
                return data.data;
            }

        } catch (error) {
            return [];
        }
    };

    return { getGame };
}