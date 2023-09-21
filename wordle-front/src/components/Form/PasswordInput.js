import Input from "./Input"
import PasswordIcon from "./PasswordIcon"

export default function PasswordInput({ value, handleChange, showPassword, togglePassword }) {
    return (
        <Input
            label={"Password"}
            value={value}
            handleChange={handleChange}
            type={showPassword ? "text" : "password"}
            icon={
                <PasswordIcon
                    showPassword={showPassword}
                    handleClick={togglePassword}
                />
            }
        />
    )
}