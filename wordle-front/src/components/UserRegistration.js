import FormTop from "./Form/FormTop";
import UsernameInput from "./Form/UsernameInput";
import EmailInput from "./Form/EmailInput";
import PasswordInput from "./Form/PasswordInput";
import FormButton from "./Form/FormButton";
import FormBottom from "./Form/FormBottom";
import WindowPopUp from './Form/WindowPopUp';
import useToggle from "../hooks/useToggle";
import useForm from "../hooks/useForm";
import usePopUp from '../hooks/usePopUp';
import WordleClient from '../clients/wordleClient/wordleClient';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function UserRegistration() {
    const [showPassword, togglePassword] = useToggle(false);
    const [inputs, handleChange, resetInputs] = useForm({ username: "", email: "", password: "" });
    const [failMessage, setFailMessage] = useState("");
    const [isSuccess, toggleIsSuccess] = useToggle(false);
    const [showPopUp, openPopUp, closePopUp] = usePopUp(false);
    const client = new WordleClient();
    const successMessage = <span>Thank you for joining <span style={{ color: "purple", fontWeight: "bold" }}>Wordlematic</span>. You're being redirected to the game...</span>;
    const navigate = useNavigate();
    const handleClosePopUp = () => { resetInputs(); closePopUp() };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await client.createUser(inputs.username, inputs.email, inputs.password);
        if (response !== undefined) {
            setFailMessage(response.detail);
            openPopUp();
        } else {
            toggleIsSuccess();
            openPopUp();
            setTimeout(() => { navigate("/") }, 4000);
        }
    };
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
                />
                <FormButton buttonText={"Submit"} />
            </form>
            {showPopUp ?
                <WindowPopUp
                    open={showPopUp}
                    handleClose={!isSuccess ? handleClosePopUp : null}
                    isSuccess={isSuccess}
                    succesTitle={"Success!"}
                    succesMessage={successMessage}
                    failTitle={"Try again..."}
                    failMessage={`${failMessage}.`}
                />
                :
                null
            }
            <FormBottom
                bottomText={"Do you have an account? "}
                linkText={"Log In!"}
                linkReference={"/login"}
            />
        </>
    )
}

