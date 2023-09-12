import { useState } from "react"

export default function useToggleState(init_value = false) {
    const [state, setState] = useState(init_value)
    const toggle = () => { setState(!state) }
    return [state, toggle]
}