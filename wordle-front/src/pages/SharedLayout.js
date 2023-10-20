import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import { sharedLayoutTitleSX } from "../styles/Styles";

export default function SharedLayout() {
    return (
        <>
            <Typography component={"h1"} variant="h3" sx={sharedLayoutTitleSX}>
                WORDLEMATIC
            </Typography>
            <Outlet />
        </>
    )
}