import Box from "@mui/material/Box";
import UserLoginForm from "../components/UserLoginForm";
import "../styles/Form.css";

export default function Login() {
    return (
        <Box className="form">
            <UserLoginForm />
        </Box>
    )
}