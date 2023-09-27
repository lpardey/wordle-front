import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"

export default function NotFoundBottom({ errorCode, bottomText, linkText, linkReference }) {
    const boxSX = { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }
    const textSX = { marginTop: "8px", fontWeight: "bold" }
    const linkStyle = { marginTop: "10px", color: "#8B38F7", fontWeight: "bold" }
    return (
        <>
            <Box sx={boxSX}>
                <Typography component={"h2"} variant="h4" marginTop={"8px"}>
                    {errorCode}
                </Typography>
                <Typography component={"h2"} variant="h6" sx={textSX}>
                    {bottomText}
                </Typography>
                <Link to={linkReference} style={linkStyle}>
                    {linkText}
                </Link>
            </Box>
        </>
    )
}