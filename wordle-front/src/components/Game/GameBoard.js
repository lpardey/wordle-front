import Guess from "./Guess"
import Stack from "@mui/material/Stack"

export default function GameBoard({ guesses, maxAttempts }) {
    const board = getBoard(guesses, maxAttempts)
    const getBackgroundColor = (number) => number === 0 ? "#61D78C" : number === 1 ? "#F1F483" : "#797979"
    return (
        <Stack direction={"column"}>
            {board.map(({ word, letters_status }, index) => (
                <Guess
                    key={index}
                    word={word || ""}
                    status={letters_status || ""}
                    getBackgroundColor={getBackgroundColor}
                />
            ))}
        </Stack>
    )
}

function getBoard(guesses, maxAttempts) {
    const guessesAmount = guesses.length
    if (guessesAmount < maxAttempts) {
        const toComplete = Array(maxAttempts - guessesAmount).fill({})
        guesses.push(...toComplete)
    }
    return guesses
}