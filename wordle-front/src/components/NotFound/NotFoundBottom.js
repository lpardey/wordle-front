import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"

export default function NotFoundBottom({ errorNumber, bottomText, linkText, linkReference }) {
    return (
        <>
            <Box display={"flex"} flexDirection={"column"} alignItems="center" justifyContent={"center"}>
                <Typography component={"h2"} variant="h4" marginTop={1} fontWeight={"bold"}>
                    {errorNumber}
                </Typography>
                <Typography component={"h2"} variant="h6" marginTop={1} fontWeight={"bold"}>
                    {bottomText}
                </Typography>
                <Link to={linkReference} style={{ marginTop: 10, color: "#8B38F7" }}>
                    {linkText}
                </Link>
            </Box>
        </>
    )
}