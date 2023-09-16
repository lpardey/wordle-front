import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";

export default function SharedLayout() {
    const titleStyle = { display: "flex", justifyContent: "center", margin: "auto", marginTop: 40, color: "#8B38F7", fontWeight: "bold" }
    return (
        <>
            <Typography
                component={"h1"}
                variant="h3"
                style={titleStyle}
            >
                WORDLEMATIC
            </Typography>
            <Outlet />
        </>
    )
}