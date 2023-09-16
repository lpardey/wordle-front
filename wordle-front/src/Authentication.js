import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useToggle from "./hooks/useToggle";
import useForm from "./hooks/useForm";
import { useEffect } from "react";
import axios from "axios"


export default function Authentication() {
    const [isLoginPage, toggleLogin] = useToggle(true);
    const [showPassword, togglePassword] = useToggle(false);
    const [inputs, handleChange, resetInputs] = useForm({ username: "", email: "", password: "" })
    const handleMouseDownPassword = (event) => { event.preventDefault() };
    const handleLink = () => { toggleLogin(); resetInputs() }
    const handleSubmit = (e) => { e.preventDefault(); postData(isLoginPage) }

    const postData = (isLoginPage) => {
        const url = "http://wordle_back:8000/account/login"
        const data = isLoginPage ? { username: inputs.username, password: inputs.password }
            : { username: inputs.username, email: inputs.email, password: inputs.password }
        axios.post(url, data).then((response) => {
            const result = response.data
        }).catch(error => console.error(`Error ${error}`));
    }

    // useEffect(() => {
    //     async function getLogInResponse() {
    //         const url = "endpont that receives the data"
    //         const data = inputs
    //         const response = axios.get(url, data);
    //         console.log("hola")
    //     }
    //     getLogInResponse();
    // }, [inputs])

    // useEffect(() => {
    //     async function PostLogInData() {
    //         const url = "endpont that receives the data"
    //         const data = inputs
    //         const response = axios.post(url, data);
    //     }
    //     PostLogInData();
    // }, [inputs])

    return (
        <>
            <Typography component={"h2"} variant="h5" sx={{ marginTop: 1, marginBottom: 1, }}>
                {isLoginPage ? 'Log In' : 'Register'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl margin="normal" variant="outlined" color="secondary" required fullWidth sx={{ marginTop: 1, marginBottom: 1, backgroundColor: "white" }}>
                    <InputLabel htmlFor="outlined-adornment-username" >Username</InputLabel>
                    <OutlinedInput id="outlined-adornment-username" name="username" value={inputs.username} onChange={handleChange} label="Username" />
                </FormControl>
                {!isLoginPage &&
                    <FormControl margin="normal" variant="outlined" color="secondary" required fullWidth sx={{ marginTop: 1, marginBottom: 1, backgroundColor: "white" }}>
                        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                        <OutlinedInput id="outlined-adornment-email" name="email" value={inputs.email} onChange={handleChange} type="email" label="Email" />
                    </FormControl>
                }
                <FormControl margin="normal" variant="outlined" color="secondary" required fullWidth sx={{ marginTop: 1, marginBottom: 1, backgroundColor: "white" }}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={togglePassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 1, marginBottom: 1, backgroundColor: "#8B38F7", "&:hover": { backgroundColor: "#700af5" } }} >
                    Submit
                </Button>
            </form>
            <Typography component={"p"} variant="subtitle1" sx={{ marginTop: 1, marginBottom: 1, }} >
                {isLoginPage ? 'No account? ' : 'Do you have an account? '}
                <Link color={"#8B38F7"} href="#" onClick={handleLink}>
                    {isLoginPage ? 'Register!' : 'Log In!'}
                </Link>
            </Typography>
        </>
    )
}

