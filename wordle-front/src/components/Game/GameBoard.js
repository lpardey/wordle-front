import Guess from "./Guess"
import Stack from "@mui/material/Stack"

export default function GameBoard({ guesses, getbgC }) {
    const [guess_1, guess_2, guess_3, guess_4, guess_5, guess_6] = guesses
    return (
        <Stack direction={"column"}>
            <Guess word={guess_1.word} status={guess_1.letters_status} getBackgroundColor={getbgC} />
            <Guess word={guess_2.word} status={guess_2.letters_status} getBackgroundColor={getbgC} />
            <Guess word={guess_3.word} status={guess_3.letters_status} getBackgroundColor={getbgC} />
            <Guess word={guess_4.word} status={guess_4.letters_status} getBackgroundColor={getbgC} />
            <Guess word={guess_5.word} status={guess_5.letters_status} getBackgroundColor={getbgC} />
            <Guess word={guess_6.word} status={guess_6.letters_status} getBackgroundColor={getbgC} />
        </Stack>
    )
}