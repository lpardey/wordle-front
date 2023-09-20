import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import lostImg from "../static/lost.jpg"
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                margin={"auto"}
                padding={5}
            >
                <img src={lostImg} alt="I'm lost!" style={{ width: 400, height: 300 }} />
            </Box>
            <Box
                display={"flex"}
                flexDirection={"column"}
                maxWidth={300}
                alignItems="center"
                justifyContent={"center"}
                margin={"auto"}
            >
                <Typography component={"h2"} variant="h4" marginTop={1} fontWeight={"bold"}>404</Typography>
                <Typography component={"h2"} variant="h6" marginTop={1} fontWeight={"bold"}> Page Not Found</Typography>
                <Link to="/" style={{ marginTop: 10 }}>Back</Link>
            </Box>
        </>
    )
};


