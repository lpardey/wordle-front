import Button from "@mui/material/Button"
import { gameButtonSX } from "../../styles/Styles"

export default function GameButton({ buttonText }) {
    return (
        <Button type="submit" variant="contained" size="small" sx={gameButtonSX}>
            {buttonText}
        </Button>
    )
}