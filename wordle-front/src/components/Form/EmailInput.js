import Input from "./Input"

export default function EmailInput({ value, handleChange }) {
    return (
        <Input
            label={"Email"}
            value={value}
            handleChange={handleChange}
            type={"email"}
        />
    )
}