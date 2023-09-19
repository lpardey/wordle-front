import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import useToggle from "./hooks/useToggle";
import useForm from "./hooks/useForm";
import { useEffect } from "react";
import axios from "axios"
import Input from "./components/Input";
import PasswordIcon from "./components/PasswordIcon";



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
                {isLoginPage ? "Log In" : "Register"}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Input
                    label={"Username"}
                    value={inputs.username}
                    handleChange={handleChange}
                    type={"text"}
                />
                {!isLoginPage &&
                    <Input label={"Email"} value={inputs.email} handleChange={handleChange} type={"email"} />
                }
                <Input
                    label={"Password"}
                    value={inputs.password}
                    handleChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    icon={
                        <PasswordIcon
                            showPassword={showPassword}
                            handleClick={togglePassword}
                            handleMouseDown={handleMouseDownPassword}
                        />
                    }
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ marginTop: 1, marginBottom: 1, backgroundColor: "#8B38F7", "&:hover": { backgroundColor: "#700af5" } }}
                >
                    Submit
                </Button>
            </form>
            <Typography component={"p"} variant="subtitle1" sx={{ marginTop: 1, marginBottom: 1, }} >
                {isLoginPage ? "No account? " : "Do you have an account? "}
                <Link color={"#8B38F7"} href="#" onClick={handleLink}>
                    {isLoginPage ? "Register!" : "Log In!"}
                </Link>
            </Typography>
        </>
    )
}

