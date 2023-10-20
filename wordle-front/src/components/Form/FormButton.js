import Button from "@mui/material/Button"
import { formButtonSX } from "../../styles/Styles"

export default function FormButton({ buttonText }) {
    return (
        <Button type="submit" variant="contained" fullWidth sx={formButtonSX}>
            {buttonText}
        </Button >
    )
}