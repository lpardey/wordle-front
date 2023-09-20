import Input from "./Input"

export default function UsernameInput({ value, handleChange }) {
    return (
        <Input
            label={"Username"}
            value={value}
            handleChange={handleChange}
            type={"text"}
        />
    )
}