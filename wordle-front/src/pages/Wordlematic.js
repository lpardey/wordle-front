import Box from "@mui/material/Box";
import Game from "../components/Game"

export default function Wordlematic() {
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            maxWidth={350}
            alignItems="center"
            justifyContent={"center"}
            margin={"auto"}
            marginTop={5}
            padding={5}
            borderRadius={5}
            boxShadow={"10px 10px 15px #ccc"}
            backgroundColor="#FAF9FA"
            sx={{ ":hover": { boxShadow: "15px 15px 25px #ccc" } }}
        >
            <Game />
        </Box>
    )
}