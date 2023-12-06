import Button from "@mui/material/Button"
import { gameButtonSX } from "../../styles/Styles"

export default function GameButton({ buttonText, handleMouseDown, handleDisabled }) {
    return (
        <Button
            type="submit"
            variant="contained"
            size="small"
            onMouseDown={handleMouseDown}
            sx={gameButtonSX}
            disabled={handleDisabled}
        >
            {buttonText}
        </Button>
    )
}