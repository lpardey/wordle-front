import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Authentication from "../components/Authentication";

export default function Home() {
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
            <Avatar sx={{ backgroundColor: "purple", width: 60, height: 60 }}>
                <LockIcon />
            </Avatar>
            <Authentication />
        </Box>
    )
}