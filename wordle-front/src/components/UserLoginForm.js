import FormTop from "./Form/FormTop";
import UsernameInput from "./Form/UsernameInput";
import PasswordInput from "./Form/PasswordInput";
import FormButton from "./Form/FormButton";
import FormBottom from "./Form/FormBottom";
import WindowPopUp from "./Form/WindowPopUp";
import useToggle from "../hooks/useToggle";
import useForm from "../hooks/useForm";
import WordleClient from "../client/WordleClient";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import redirectToGame from "./helpers/redirectToGame";

export default function UserLoginForm() {
    const [showPassword, togglePassword] = useToggle(false);
    const [inputs, handleChange, resetInputs] = useForm({ username: "", password: "" });
    const [failMessage, setFailMessage] = useState("");
    const [isSuccess, toggleIsSuccess] = useToggle(false);
    const [open, toggleOpen] = useToggle(false)
    const client = new WordleClient();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginUserResponse = await client.loginUser(inputs.username, inputs.password);
        if (loginUserResponse.detail) {
            setFailMessage(loginUserResponse.detail);
            toggleOpen();
        } else {
            toggleIsSuccess();
            toggleOpen();
            redirectToGame(client, loginUserResponse.userId, navigate)
        }
        resetInputs();
    };
    return (
        <>
            <FormTop topText={"Log In"} icon={<LockIcon />} />
            <form onSubmit={handleSubmit}>
                <UsernameInput value={inputs.username} handleChange={handleChange} />
                <PasswordInput
                    value={inputs.password}
                    handleChange={handleChange}
                    showPassword={showPassword}
                    togglePassword={togglePassword}
                />
                <FormButton buttonText={"Submit"} />
            </form>
            <WindowPopUp
                open={open}
                handleClose={!isSuccess ? toggleOpen : null}
                isSuccess={isSuccess}
                succesTitle={"Success!"}
                succesMessage={"Redirecting to the game..."}
                failTitle={"Try again..."}
                failMessage={`${failMessage}.`}
            />
            <FormBottom
                bottomText={"No account? "}
                linkText={"Register!"}
                linkReference={"/registration"}
            />
        </>
    )
}

