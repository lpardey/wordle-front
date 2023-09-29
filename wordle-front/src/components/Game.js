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
    // Get game status info(game word: str, guesses: list[dict[str, list[int]]], game_id) 
    // from api endpoint: http://wordle_back:8000/game/`${game_id}`.

    let {playerId, gameId} = useParams()

    const [guesses, setGuesses] = useState([]) // { word: "cloud", letters_status: [0, 2, 2, 2, 1] }
    const [guessStatus, setGuessStatus] = useState({ status: "", message: "", result: "" })

    const [guess, setGuess] = useState("")
    // const [gameStatus, setGameStatus] = useState("WAITING_FOR_GUESS")
    const [maxAttempts, setMaxAttempts] = useState(6)
    const [endGamePopUp, toggleEndGamePopUp] = useToggle(false)

    const handleChange = (e) => { setGuess(e.target.value) }

    // TODO
    // hacer un get al back para el game status
    // guardar el game status en el localStorage
    // que no muestre el juego si hay partida en el localStorage sino que se cree una nueva

    const client = new WordleClient();
    // const [playerId, gameId] = getGameData() // Make a request to get playerId and gameId

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuess("");
        const takeAGuessResponse = await client.takeAGuess(guess, playerId, gameId)
        setGuessStatus({ status: takeAGuessResponse.status, message: takeAGuessResponse.message, result: takeAGuessResponse.guess_result })
        if (takeAGuessResponse.status !== "ERROR") {
            guesses.push({ word: guess, letters_status: takeAGuessResponse.letters_status })
            setGuesses(guesses)
        } else {
            // Something unexpected happened
        }
    }
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
    const gameSnackbarMessage = guessStatus.status === "ERROR" ? guessStatus.message : `Attempts left: ${maxAttempts - guesses.length}`
    const isOver = (guessStatus.status === "OK" && guessStatus.result === "GUESSED") || (guessStatus.status === "ERROR" && guesses.length === maxAttempts)
    return (
        <>
            {console.log(guessStatus)}
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