import { useState } from "react";

export default function useForm(initialValue) {
    const [value, setValue] = useState(initialValue)
    const handleChange = (e) => {
        setValue((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }))
    }
    const reset = () => setValue(initialValue)
    return [value, handleChange, reset]
}

