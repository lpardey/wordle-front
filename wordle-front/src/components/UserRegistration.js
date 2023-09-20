import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FormTop from "./Form/FormTop";
import UsernameInput from "./Form/UsernameInput";
import EmailInput from "./Form/EmailInput";
import PasswordInput from "./Form/PasswordInput";
import FormButton from "./Form/FormButton";
import FormBottom from "./Form/FormBottom";
import useToggle from "../hooks/useToggle";
import useForm from "../hooks/useForm";

import { useEffect } from "react";
import axios from "axios"

export default function UserRegistration() {
    const [showPassword, togglePassword] = useToggle(false);
    const [inputs, handleChange, resetInputs] = useForm({ username: "", email: "", password: "" })
    const handleMouseDownPassword = (event) => { event.preventDefault() };
    const handleSubmit = (e) => { e.preventDefault(); postData() }

    const postData = () => {
        const url = "http://localhost:8000/account/SOMETHING"
        const data = { username: inputs.username, email: inputs.email, password: inputs.password }
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
            <FormTop topText={"Register"} icon={<AppRegistrationIcon />} />
            <form onSubmit={handleSubmit}>
                <UsernameInput value={inputs.username} handleChange={handleChange} />
                <EmailInput value={inputs.email} handleChange={handleChange} />
                <PasswordInput
                    value={inputs.password}
                    handleChange={handleChange}
                    showPassword={showPassword}
                    togglePassword={togglePassword}
                    handleMouseDownPassword={handleMouseDownPassword}
                />
                <FormButton buttonText={"Submit"} />
            </form>
            <FormBottom
                bottomText={"Do you have an account? "}
                linkText={"Log In!"}
                linkReference={"/Login"}
                handleLink={resetInputs}
            />
        </>
    )
}

