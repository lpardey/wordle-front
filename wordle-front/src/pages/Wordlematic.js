import Box from "@mui/material/Box";
import Game from "../components/Game"
import "../styles/Form.css"
import GameAccessPopUp from "../components/GameAccessPopUp";
import useTimer from "./hooks/useTimer";
import useGameStatus from "./hooks/useGameStatus";

export default function Wordlematic() {
    const [isGameOngoing, gameFinishedDate] = useGameStatus()
    const [hours, minutes, seconds] = useTimer(gameFinishedDate, 24)
    const title = "Enough Wordlematic for today!"
    const message = `
    Don't worry, you'll be able to play again in 
    ${hours}:${minutes}:${seconds}
    `;
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