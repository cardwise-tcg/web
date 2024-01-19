import { createContext, useEffect, useState } from 'react';
import { availableGames } from "../config/games";

export const SelectedGameContext = createContext(null);

const SELECTED_GAME_KEY = 'selectedGame';

const isValidGame = (game) => {
    return availableGames.includes(game);
};

const SelectedGameProvider = ({ children }) => {
    const [game, setGame] = useState(null);

    useEffect(() => {
        const selectedGame = localStorage.getItem(SELECTED_GAME_KEY);
        if (isValidGame(selectedGame)) {
            setGame(selectedGame);
        } else {
            localStorage.removeItem(SELECTED_GAME_KEY);
            setGame(false);
        }
    }, []);

    const setSelectedGame = (game) => {
        if (isValidGame(game)) {
            localStorage.setItem(SELECTED_GAME_KEY, game);
            setGame(game);
        } else {
            localStorage.removeItem(SELECTED_GAME_KEY);
            setGame(false);
        }
    };

    return (
        <SelectedGameContext.Provider value={{ game, setSelectedGame }}>
            {children}
        </SelectedGameContext.Provider>
    );
}
export default SelectedGameProvider;
