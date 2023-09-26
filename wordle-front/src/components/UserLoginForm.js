import FormTop from "./Form/FormTop";
import UsernameInput from "./Form/UsernameInput";
import PasswordInput from "./Form/PasswordInput";
import FormButton from "./Form/FormButton";
import FormBottom from "./Form/FormBottom";
import WindowPopUp from "./Form/WindowPopUp";
import useToggle from "../hooks/useToggle";
import useForm from "../hooks/useForm";
import usePopUp from "../hooks/usePopUp";
import WordleClient from "../clients/wordleClient/wordleClient";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UserLoginForm() {
    const [showPassword, togglePassword] = useToggle(false);
    const [inputs, handleChange, resetInputs] = useForm({ username: "", password: "" });
    const [failMessage, setFailMessage] = useState("");
    const [isSuccess, toggleIsSuccess] = useToggle(false);
    const [showPopUp, openPopUp, closePopUp] = usePopUp(false);
    const client = new WordleClient();
    const navigate = useNavigate();
    const handleClosePopUp = () => { resetInputs(); closePopUp() };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await client.loginUser(inputs.username, inputs.password);
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
            {showPopUp ?
                <WindowPopUp
                    open={showPopUp}
                    handleClose={!isSuccess ? handleClosePopUp : null}
                    isSuccess={isSuccess}
                    succesTitle={"Success!"}
                    succesMessage={"Redirecting to the game..."}
                    failTitle={"Try again..."}
                    failMessage={`${failMessage}.`}
                />
                :
                null
            }
            <FormBottom
                bottomText={"No account? "}
                linkText={"Register!"}
                linkReference={"/registration"}
            />
        </>
    )
}

