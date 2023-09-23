import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FormTop from "./Form/FormTop";
import UsernameInput from "./Form/UsernameInput";
import EmailInput from "./Form/EmailInput";
import PasswordInput from "./Form/PasswordInput";
import FormButton from "./Form/FormButton";
import FormBottom from "./Form/FormBottom";
import useToggle from "../hooks/useToggle";
import useForm from "../hooks/useForm";
import WordleClient from '../clients/wordleClient/wordleClient';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RegistrationPopUp from './Form/RegistrationPopUp';

export default function UserRegistration() {
    const [showPassword, togglePassword] = useToggle(false);
    const [inputs, handleChange, resetInputs] = useForm({ username: "", email: "", password: "" })
    const [failMessage, setFailMessage] = useState("")
    const [openPopUp, togglePopUp] = useToggle(false);
    const [isSuccess, toggleIsSuccess] = useToggle(false);
    const client = new WordleClient();
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await client.createUser(inputs.username, inputs.email, inputs.password);
        if (response !== undefined) {
            setFailMessage(response.detail)
            togglePopUp(openPopUp)
            setTimeout(() => { navigate(0) }, 3000)
        } else {
            toggleIsSuccess(isSuccess)
            togglePopUp(openPopUp)
            setTimeout(() => { navigate("/") }, 3000)
        }
    }
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
            {openPopUp ?
                <RegistrationPopUp
                    open={openPopUp}
                    isSuccess={isSuccess}
                    succesTitle={"Sucess!"}
                    succesMessage={"Thank you for joining 'Wordlematic'. You're being redirected to the game..."}
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

