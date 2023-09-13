import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Login from "./Login";
import Register from "./Register";
import useToggleState from "./hooks/useToggleState";

function SignIn() {
    const avatarStyle = { backgroundColor: "purple", width: 60, height: 60 };
    const btnStyle = { margin: "18px 0", width: 150, backgroundColor: "#8B38F7" };
    const [showLogin, toggleLogin] = useToggleState(true)
    const [showPassword, togglePassword] = useToggleState()
    const handleMouseDownPassword = (event) => { event.preventDefault() };
    // // TODO clear the inputfields aswell onclick login onclick register
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            maxWidth={325}
            alignItems="center"
            justifyContent={"center"}
            margin={"auto"}
            marginTop={5}
            padding={3}
            borderRadius={5}
            boxShadow={"10px 10px 15px #ccc"}
            backgroundColor="#FAF9FA"
            sx={{ ":hover": { boxShadow: "15px 15px 25px #ccc" } }}
        >
            <Avatar style={avatarStyle}><LockIcon /></Avatar>
            {
                showLogin ? (
                    <Login
                        showPassword={showPassword}
                        handleClickShowPassword={togglePassword}
                        handleClickRegister={toggleLogin}
                        handleMouseDownPassword={handleMouseDownPassword}
                        btnStyle={btnStyle}
                    />
                ) : (
                    <Register
                        showPassword={showPassword}
                        handleClickShowPassword={togglePassword}
                        handleClickRegister={toggleLogin}
                        handleMouseDownPassword={handleMouseDownPassword}
                        btnStyle={btnStyle}
                    />
                )
            }
        </Box>
    )
}
export default SignIn