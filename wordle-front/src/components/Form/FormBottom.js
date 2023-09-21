import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"

export default function FormBottom({ bottomText, linkText, linkReference }) {
    return (
        <Typography component={"p"} variant="subtitle1" sx={{ marginTop: 1, marginBottom: 1, }} >
            {bottomText}
            <Link to={linkReference} style={{ marginTop: 10, color: "#8B38F7" }}>
                {linkText}
            </Link>
        </Typography>
    )
}