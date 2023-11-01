import { useState } from "react";
import WordleClient from "../../client/WordleClient";

export default function useGameStatus() {
    const [gameStatus, setGameStatus] = useState({})
    const client = new WordleClient();
    useEffect(async () => {
        const currentGameStatus = await client.getOngoingGameStatus()
        setGameStatus({
            isGameOngoing: currentGameStatus.ongoingGame,
            gameFinishedDate: currentGameStatus.gameStatus.finished_date
        })
    }, [])
    return [gameStatus.isGameOngoing, gameStatus.gameFinishedDate]
}