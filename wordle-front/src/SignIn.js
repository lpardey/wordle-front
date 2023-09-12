import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Login from "./Login";
import Register from "./Register";
import Typography from "@mui/material/Typography";
import useToggleState from "./hooks/useToggleState";

function SignIn() {
    const paperStyle = { padding: 20, height: "50vh", width: 280, margin: "20px auto" };
    const avatarStyle = { backgroundColor: "purple" };
    const btnStyle = { margin: "18px 0" };
    const [showLogin, toggleLogin] = useToggleState(true)
    const [showPassword, togglePassword] = useToggleState()
    const handleMouseDownPassword = (event) => { event.preventDefault() };
    // // const [showLogIn, setshowLogIn] = useState(true);
    // // TODO clear the inputfields aswell onclick login onclick register
    // const handleClickLogIn = () => setshowLogIn((view) => !view);
    // const [showPassword, setShowPassword] = useState(false);
    // const handleClickShowPassword = () => setShowPassword((show) => !show);
    return (
        <>
            <Grid align="center" >
                <Typography variant="h3" component={"h1"}>WORDLEMATIC</Typography>
                {/* TODO make the paper responsive/resizable */}
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockIcon /></Avatar>
                        {/* TODO refactor the ternary operator into a function */}
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
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}
export default SignIn