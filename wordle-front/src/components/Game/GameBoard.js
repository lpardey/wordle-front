import Guess from "./Guess"
import Stack from "@mui/material/Stack"

export default function GameBoard({ guesses, maxAttempts }) {
    const board = getBoard(guesses, maxAttempts)
    return (
        <Stack direction={"column"}>
            {board.map(({ word, lettersStatus }, index) => (
                <Guess
                    key={index}
                    word={word || ""}
                    status={lettersStatus || ""}
                />
            ))}
        </Stack>
    )
}

function getBoard(guesses, maxAttempts) {
    const remainingAttempts = maxAttempts - guesses.length
    const emptyRow = { lettersStatus: [2, 2, 2, 2, 2] }
    const filler = (remainingAttempts > 0) ? Array(remainingAttempts).fill(emptyRow) : []
    return guesses.concat(filler)
}