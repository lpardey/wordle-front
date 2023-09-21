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
import { redirect } from 'react-router-dom';

export default function UserRegistration() {
    const [showPassword, togglePassword] = useToggle(false);
    const [inputs, handleChange, resetInputs] = useForm({ username: "", email: "", password: "" })
    const client = new WordleClient();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await client.createUser(inputs.username, inputs.email, inputs.password);
        if (response !== undefined) {
            alert(`Error: ${response.detail}`);
        } else {
            // redirect to "/" with the react router
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
            <FormBottom
                bottomText={"Do you have an account? "}
                linkText={"Log In!"}
                linkReference={"/login"}
            />
        </>
    )
}

