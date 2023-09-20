import Box from "@mui/material/Box";
import UserRegistration from "../components/UserRegistration";

export default function Registration() {
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            maxWidth={260}
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
            <UserRegistration />
        </Box>
    )
}