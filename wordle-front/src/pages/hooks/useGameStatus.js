import { useState, useEffect } from "react";
import WordleClient from "../../client/WordleClient";

const useGameStatus = (initialState = {}) => {
    const [gameStatus, setGameStatus] = useState(initialState)

    useEffect(() => {
        const client = new WordleClient();
        const fetchCurrentGameStatus = async (client) => {
            let response = await client.getOngoingGameStatus()
            setGameStatus({
                isGameOngoing: response.ongoingGame,
                gameFinishedDate: response.gameStatus.finished_date
            });
        }
        fetchCurrentGameStatus(client);
    }, [])

    return [gameStatus.isGameOngoing, gameStatus.gameFinishedDate]
}

export default useGameStatus