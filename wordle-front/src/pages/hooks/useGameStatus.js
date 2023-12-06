import { useState, useEffect } from "react";
import WordleClient from "../../client/WordleClient";

const useGameStatus = (initialState = {}, gameId) => {
    const [gameStatus, setGameStatus] = useState(initialState)
    const client = new WordleClient()

    const fetchGameStatus = async () => {
        const response = await client.getLastGameStatus();
        setGameStatus({
            currentStatus: response.status,
            gameMaxAttempts: response.maxAttempts,
            gameGuesses: response.guesses,
            gameResult: response.result,
            gameFinishedDate: response.finishedDate,
            gameIsOver: response.isOver(),
        });
    }

    const useGameStatusEffect = () => {
        useEffect(() => {
            fetchGameStatus();
        }, [gameId, gameStatus.currentStatus])
    }

    return [gameStatus, useGameStatusEffect]
}

export default useGameStatus