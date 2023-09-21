import Letter from "./Letter"
import Stack from "@mui/material/Stack"

export default function Guess({ word, status, getBackgroundColor }) {
    const letter_1 = word[0] || ""
    const letter_2 = word[1] || ""
    const letter_3 = word[2] || ""
    const letter_4 = word[3] || ""
    const letter_5 = word[4] || ""
    const status_1 = setStauts(status[0])
    const status_2 = setStauts(status[1])
    const status_3 = setStauts(status[2])
    const status_4 = setStauts(status[3])
    const status_5 = setStauts(status[4])
    return (
        <Stack direction={"row"}>
            <Letter letter={letter_1} backgroundColor={getBackgroundColor(status_1)} />
            <Letter letter={letter_2} backgroundColor={getBackgroundColor(status_2)} />
            <Letter letter={letter_3} backgroundColor={getBackgroundColor(status_3)} />
            <Letter letter={letter_4} backgroundColor={getBackgroundColor(status_4)} />
            <Letter letter={letter_5} backgroundColor={getBackgroundColor(status_5)} />
        </Stack>
    )
}

const setStauts = (value) => {
    if (value === 0) {
        return 0
    } else if (value === 1) {
        return 1
    } else {
        return 2
    }
}