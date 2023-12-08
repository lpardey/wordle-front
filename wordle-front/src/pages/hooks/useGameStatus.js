import { useState } from "react";
import WordleClient from "../../client/WordleClient";

const useGameStatus = (initialState = {}) => {
    const [gameStatus, setGameStatus] = useState(initialState)
    const client = new WordleClient()

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