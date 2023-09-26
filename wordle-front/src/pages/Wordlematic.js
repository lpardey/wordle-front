import Box from "@mui/material/Box";
import Game from "../components/Game"
import "../styles/Form.css"

export default function Wordlematic() {
    return (
        <Box className="form" sx={{ maxWidth: "350px" }}>
            <Game />
        </Box>
    )
}