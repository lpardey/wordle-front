import Box from "@mui/material/Box";
import Game from "../components/Game"
import "../styles/Form.css"

// if session exp date < now show popup session expired and redirect to login else show actual game
// if game is over and exp date < now show popup need to wait 'xxx' time to play again, else recreate game
// A state will monitor the expiration date of a game
export default function Wordlematic() {
    return (
        <Box className="form" sx={{ maxWidth: "350px" }}>
            <Game />
        </Box>
    )
}