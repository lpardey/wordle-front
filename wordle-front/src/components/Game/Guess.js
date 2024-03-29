import Letter from "./Letter"
import Stack from "@mui/material/Stack"


const colors = {
    0: "#61D78C",
    1: "#F1F483",
    2: "#797979"
}

export default function Guess({ word, status }) {
    const lettersWithStatus = getLettersWithStatus(word, status)
    return (
        <Stack direction={"row"}>
            {lettersWithStatus.map(({ letter, letter_status }, index) => (
                <Letter
                    key={index}
                    letter={letter}
                    backgroundColor={colors[letter_status]}
                />
            ))}
        </Stack>
    )
}

function getLettersWithStatus(word, status) {
    const lettersWithStatus = []
    const gameWordLength = 5
    for (let i = 0; i < gameWordLength; i++) {
        lettersWithStatus.push({
            letter: word[i] || "",
            letter_status: setStauts(status[i])
        })
    }
    return lettersWithStatus
}

function setStauts(value) {
    if (value === 0) {
        return 0
    } else if (value === 1) {
        return 1
    } else {
        return 2
    }
}