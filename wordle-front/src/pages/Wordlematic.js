import Box from "@mui/material/Box";
import Game from "../components/Game"
import "../styles/Form.css"
import redirectToGame from "../components/helpers/redirectToGame";
import { useEffect, useState } from "react";
import WordleClient from "../client/WordleClient";
import GameAccessPopUp from "../components/GameAccessPopUp";
import useTimer from "./hooks/useTimer";
import useGameStatus from "./hooks/useGameStatus";

// if session exp date < now show popup session expired and redirect to login else show actual game
// if game is over and exp date < now show popup need to wait 'xxx' time to play again, else recreate game
// A state will monitor the expiration date of a game
// get_last_game from the back
// redirectToGame from
export default function Wordlematic() {
    // const [gameStatus, setGameStatus] = useState({ isGameOngoing: false, gameFinishedDate: "" })
    const [isGameOngoing, gameFinishedDate] = useGameStatus()
    const [hours, minutes, seconds] = useTimer(gameFinishedDate, 24)
    const title = "Enough Wordlematic for today!"
    const message = `
    Don't worry, you'll be able to play again in 
    ${hours}:${minutes}:${seconds}
    `;
    // const client = new WordleClient();
    // useEffect(async () => {
    //     const currentGameStatus = await client.getOngoingGameStatus()
    //     setGameStatus({
    //         isGameOngoing: currentGameStatus.ongoingGame,
    //         gameFinishedDate: currentGameStatus.gameStatus.finished_date
    //     })
    // }, [])
    return (
        <Box className="form" sx={{ maxWidth: "350px" }}>
            {isGameOngoing ?
                <Game />
                :
                <GameAccessPopUp open={true} handleClose={null} title={title} message={message} />
            }
        </Box>
    )
}