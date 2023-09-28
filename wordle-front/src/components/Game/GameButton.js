import Button from "@mui/material/Button"
import { gameButtonSX } from "../../styles/Styles"

export default function GameButton({ handleClick, handleMouseDown, buttonText }) {
    return (
        <Button
            type="submit"
            variant="contained"
            size="small"
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            sx={gameButtonSX}
        >
            {buttonText}
        </Button>
    )
}