import GameBoard from "./Game/GameBoard";
import GameInput from "./Game/GameInput";
import GameButton from "./Game/GameButton";
import GameSnackbar from "./Game/GameSnackbar";
import WordleClient from "../clients/wordleClient/wordleClient";
import useToggle from "../hooks/useToggle";
import { gameFormStyle } from "../styles/Styles";
import { useEffect, useState } from "react";
import EndGamePopUp from "./Game/EndGamePopUp";

export default function Game() {
    // Get game status info(game word: str, guesses: list[dict[str, list[int]]], game_id) 
    // from api endpoint: http://wordle_back:8000/game/`${game_id}`.

    const [guesses, setGuesses] = useState([]) // { word: "cloud", letters_status: [0, 2, 2, 2, 1] }
    const [guessStatus, setGuessStatus] = useState({})

    const [guess, setGuess] = useState("")
    // const [gameStatus, setGameStatus] = useState("WAITING_FOR_GUESS")
    const [maxAttempts, setMaxAttempts] = useState(6)
    const [openSnackBar, toggleOpenSnackbar] = useToggle(false)
    const [endGamePopUp, toggleEndGamePopUp] = useToggle(false)

    const handleChange = (e) => { setGuess(e.target.value) }

    const client = new WordleClient();
    // const [playerId, gameId] = getGameData() // Make a request to get playerId and gameId

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuess("");
        const response = await client.takeAGuess(guess, 0, 0)
        if (response.status !== "ERROR") {
            guesses.push({ word: guess, letters_status: response.letters_status })
            setGuesses(guesses)
            setGuessStatus({ status: response.status, message: response.message, result: response.guess_result })
        } else {
            // Something unexpected happened
        }
    }
    // Snackbar 
    const [snackPack, setSnackPack] = useState([]);
    const [messageInfo, setMessageInfo] = useState(undefined);
    useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            setMessageInfo({ ...snackPack[0] });
            setSnackPack((prev) => prev.slice(1));
            toggleOpenSnackbar();
        } else if (snackPack.length && messageInfo && openSnackBar) {
            // Close an active snack when a new one is added
            toggleOpenSnackbar();
        }
    }, [snackPack, messageInfo, openSnackBar, toggleOpenSnackbar]);

    const handleClick = (message) => () => {
        setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        toggleOpenSnackbar()
    };
    const gameSnackbarMessage = !guessStatus.status ? guessStatus.message : `Attempts left: ${maxAttempts - guesses.length}`
    const isOver = (guessStatus.status === "OK" && guessStatus.result === "GUESSED") || (guessStatus.status === "ERROR" && guesses.length === maxAttempts)
    return (
        <>
            <GameBoard guesses={guesses} maxAttempts={maxAttempts} />
            <form onSubmit={handleSubmit} style={gameFormStyle}>
                <GameInput guess={guess} handleChange={handleChange} />
                <GameButton
                    handleClick={handleClick(gameSnackbarMessage)}
                    handleMouseDown={(e) => e.preventDefault()}
                    buttonText={"Guess"}
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
                    handleClose={isOver ? toggleEndGamePopUp : null}
                    guessStatus={guessStatus.status}
                    guessStatusResult={guessStatus.result}
                    attempts={guesses.length}
                    maxAttempts={maxAttempts}
                    winnerTitle={"IT'S A MATCH!"}
                    winnerMessage={"Congratulations, you guessed the word"}
                    gameOverTitle={"GAME OVER!"}
                    gameOverMessage={guessStatus.message}
                />
            </form>
        </>
    )
}