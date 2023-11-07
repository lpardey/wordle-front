import Box from "@mui/material/Box";
import GameAccessPopUp from "../components/GameAccessPopUp";
import "../styles/Form.css"

export default function Awaiting() {
    return (
        <Box className="form" sx={{ maxWidth: "350px" }}>
            <GameAccessPopUp />
        </Box>
    )
}


