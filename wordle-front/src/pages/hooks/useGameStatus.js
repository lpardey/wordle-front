import { useState, useEffect } from "react";
import WordleClient from "../../client/WordleClient";

const useGameStatus = (initialState = {}) => {
    const [gameStatus, setGameStatus] = useState(initialState)

    useEffect(() => {
        const client = new WordleClient();
        const fetchCurrentGameStatus = async () => {
            const response = await client.getOngoingGameStatus();
            let finishedDate = response.gameStatus ? response.gameStatus.finished_date : null
            setGameStatus({
                isGameOngoing: response.ongoingGame,
                gameFinishedDate: finishedDate
            });
        }
        fetchCurrentGameStatus();
    }, [])

    return [gameStatus.isGameOngoing, gameStatus.gameFinishedDate]
}
export default useGameStatus