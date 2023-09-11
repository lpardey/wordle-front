import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import LoginHook from "./hooks/LoginHook";
import RegisterHook from "./hooks/RegisterHook";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function LogIn() {
    const paperStyle = { padding: 20, height: "50vh", width: 280, margin: "20px auto" };
    const avatarStyle = { backgroundColor: "purple" };
    const btnStyle = { margin: "18px 0" };
    // TODO Create a hook for boolean switch
    const [showLogIn, setshowLogIn] = useState(true);
    // TODO clear the inputfields aswell onclick login onclick register
    const handleClickLogIn = () => setshowLogIn((view) => !view);
    // TODO refactor LoginHook and RegisterHook they are components not hooks
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => { event.preventDefault() };
    return (
        <>
            <Grid align="center" >
                <Typography variant="h3" component={"h1"}>WORDLEMATIC</Typography>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockIcon /></Avatar>
                        {/* TODO refactor the ternary operator into a function */}
                        {
                            showLogIn ? (
                                <LoginHook
                                    showPassword={showPassword}
                                    handleClickLogIn={handleClickLogIn}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                    btnStyle={btnStyle}
                                />
                            ) : (
                                <RegisterHook
                                    showPassword={showPassword}
                                    handleClickLogIn={handleClickLogIn}
                                    handleClickShowPassword={handleClickShowPassword}
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
export default LogIn