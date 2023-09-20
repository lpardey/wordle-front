import Letter from "./Letter"
import Stack from "@mui/material/Stack"

export default function Guess({ word, status, getBackgroundColor }) {
    const [status_1, status_2, status_3, status_4, status_5] = status
    return (
        <Stack direction={"row"}>
            <Letter letter={word[0]} backgroundColor={getBackgroundColor(status_1)} />
            <Letter letter={word[1]} backgroundColor={getBackgroundColor(status_2)} />
            <Letter letter={word[2]} backgroundColor={getBackgroundColor(status_3)} />
            <Letter letter={word[3]} backgroundColor={getBackgroundColor(status_4)} />
            <Letter letter={word[4]} backgroundColor={getBackgroundColor(status_5)} />
        </Stack>
    )
}