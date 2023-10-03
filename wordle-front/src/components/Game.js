import GameBoard from "./Game/GameBoard";
import GameInput from "./Game/GameInput";
import GameButton from "./Game/GameButton";
import GameSnackbar from "./Game/GameSnackbar";
import EndGamePopUp from "./Game/EndGamePopUp";
import WordleClient from "../clients/wordleClient/wordleClient";
import useToggle from "../hooks/useToggle";
import { gameFormStyle } from "../styles/Styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Game() {
    let { playerId, gameId } = useParams()
    const initialGuesses = JSON.parse(window.localStorage.getItem("guesses")) || []
    const [guesses, setGuesses] = useState(initialGuesses)
    useEffect(() => {
        window.localStorage.setItem("guesses", JSON.stringify(guesses));
    })
    // Pocho fix: clears the storage on window refresh/close tab event
    window.onbeforeunload = function (e) {
        localStorage.clear();
    };
    const [guessStatus, setGuessStatus] = useState({ status: "", message: "", result: "" })
    const [guess, setGuess] = useState("")
    const [maxAttempts] = useState(6)
    const [endGamePopUp, toggleEndGamePopUp] = useToggle(false)
    const client = new WordleClient();
    const handleChange = (e) => { setGuess(e.target.value) }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const takeAGuessResponse = await client.takeAGuess(guess, playerId, gameId)
        if (takeAGuessResponse.status === "OK" && guesses.length < maxAttempts) {
            guesses.push({ word: guess, letters_status: takeAGuessResponse.letters_status })
            setGuesses(guesses)
        };
        setGuessStatus({ status: takeAGuessResponse.status, message: takeAGuessResponse.message, result: takeAGuessResponse.guess_result })
        setGuess("");
    }
    const isOver = (guessStatus.result === "GUESSED") || (guesses.length === maxAttempts)
    useEffect(() => {
        if (isOver) {
            toggleEndGamePopUp()
        }
    }, [isOver])

    // Snackbar 
    const [snackPack, setSnackPack] = useState([]);
    const [openSnackBar, setOpenSnackbar] = useState(false)
    const [messageInfo, setMessageInfo] = useState(undefined);
    useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            setMessageInfo({ ...snackPack[0] });
            setSnackPack((prev) => prev.slice(1));
            setOpenSnackbar(true);
        } else if (snackPack.length && messageInfo && openSnackBar) {
            // Close an active snack when a new one is added
            setOpenSnackbar(false);
        }
    }, [snackPack, messageInfo, openSnackBar]);

    const handleClick = (message) => () => {
        setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    const gameSnackbarMessage = guessStatus.status === "ERROR" ? guessStatus.message : `Attempts left: ${(maxAttempts - guesses.length) - 1}`
    return (
        <>
            <GameBoard guesses={guesses} maxAttempts={maxAttempts} />
            <form onSubmit={handleSubmit} style={gameFormStyle}>
                <GameInput
                    guess={guess}
                    handleChange={handleChange}
                    handleDisabled={isOver}
                />
                <GameButton
                    buttonText={"Guess"}
                    handleClick={handleClick(gameSnackbarMessage)}
                    handleMouseDown={(e) => e.preventDefault()}
                    handleDisabled={isOver}
                />
                <GameSnackbar
                    key={messageInfo ? messageInfo.key : undefined}
                    open={openSnackBar}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    handleExited={() => { setMessageInfo(undefined) }}
                    message={messageInfo ? messageInfo.message : undefined}
                />
                <EndGamePopUp
                    open={endGamePopUp}
                    handleClose={!isOver ? toggleEndGamePopUp : null}
                    guessStatusResult={guessStatus.result}
                    winnerTitle={"IT'S A MATCH!"}
                    winnerMessage={"Congratulations, you guessed the word."}
                    gameOverTitle={"GAME OVER!"}
                    gameOverMessage={"Game word: 'xxx'."}
                />
            </form>
        </>
    )
}