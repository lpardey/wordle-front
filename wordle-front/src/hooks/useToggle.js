import { useState } from "react"

export default function useToggle(init_value) {
    const [state, setState] = useState(init_value)
    const toggle = () => { setState(!state) }
    return [state, toggle]
}