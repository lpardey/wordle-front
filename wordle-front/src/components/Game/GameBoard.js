import Guess from "./Guess"
import Stack from "@mui/material/Stack"

export default function GameBoard({ guesses, getbgC }) {
    const word_guess_1 = guesses[0].word || ""
    const status_guess_1 = guesses[0].letters_status || ""
    const guess_2 = guesses[1] || { word: "", letters_status: "" }
    const guess_3 = guesses[2] || { word: "", letters_status: "" }
    const guess_4 = guesses[3] || { word: "", letters_status: "" }
    const guess_5 = guesses[4] || { word: "", letters_status: "" }
    const guess_6 = guesses[5] || { word: "", letters_status: "" }
    return (
        <Stack direction={"column"}>
            <Guess word={word_guess_1} status={status_guess_1} getBackgroundColor={getbgC} />
            <Guess word={guess_2.word} status={guess_2.letters_status} getBackgroundColor={getbgC} />
            <Guess word={guess_3.word} status={guess_3.letters_status} getBackgroundColor={getbgC} />
            <Guess word={guess_4.word} status={guess_4.letters_status} getBackgroundColor={getbgC} />
            <Guess word={guess_5.word} status={guess_5.letters_status} getBackgroundColor={getbgC} />
            <Guess word={guess_6.word} status={guess_6.letters_status} getBackgroundColor={getbgC} />
        </Stack>
    )
}