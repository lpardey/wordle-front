import Box from "@mui/material/Box"
import "../../styles/LetterBox.css"

export default function Letter({ letter, backgroundColor }) {
    return (
        <Box className="letterBox" sx={{ backgroundColor: backgroundColor }}>
            {letter}
        </Box>
    )
}