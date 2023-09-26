import { useState } from "react";

export default function usePopUp(init_value) {
    const [state, setState] = useState(init_value)
    const openPopUp = () => { setState(true) }
    const closePopUp = () => { setState(false) }
    return [state, openPopUp, closePopUp]
}