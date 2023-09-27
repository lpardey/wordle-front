import Button from "@mui/material/Button"
import { gameButtonSX } from "../../styles/Styles"

export default function GameButton({ handleClick, buttonText }) {
    return (
        <Button
            type="submit"
            variant="contained"
            size="small"
            onClick={handleClick}
            sx={gameButtonSX}
        >
            {buttonText}
        </Button>
    )
}