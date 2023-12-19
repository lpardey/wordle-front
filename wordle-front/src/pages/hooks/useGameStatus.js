import { useState } from "react";

const useGameStatus = (client, initialState = {}) => {
    const [gameStatus, setGameStatus] = useState(initialState)

    const fetchGameStatus = async () => {
        const response = await client.getLastGameStatus();
        setGameStatus({
            currentStatus: response.status,
            gameWord: response.gameWord,
            gameMaxAttempts: response.maxAttempts,
            gameGuesses: response.guesses,
            gameResult: response.result,
            gameFinishedDate: response.finishedDate,
            gameIsOver: response.isOver(),
        });
    }

    return [gameStatus, fetchGameStatus]
}

export default useGameStatus