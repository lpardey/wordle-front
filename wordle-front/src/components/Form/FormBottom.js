import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"

export default function FormBottom({ bottomText, linkText, linkReference }) {
    const linkStyle = { marginTop: "80px", color: "#8B38F7" }
    const textSX = { marginTop: "8px", marginBottom: "8px" }
    return (
        <Typography component={"p"} variant="subtitle1" sx={textSX} >
            {bottomText}
            <Link to={linkReference} style={linkStyle}>
                {linkText}
            </Link>
        </Typography>
    )
}