import GameBoard from "./Game/GameBoard";
import GameInput from "./Game/GameInput";
import GameButton from "./Game/GameButton";
import GameSnackbar from "./Game/GameSnackbar";
import EndGamePopUp from "./Game/EndGamePopUp";
import WordleClient from "../client/WordleClient";
import useToggle from "../hooks/useToggle";
import { gameFormStyle } from "../styles/Styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Game() {
    let { gameId } = useParams()
    const storedGuesses = JSON.parse(localStorage.getItem("guesses")) || [];
    const [guesses, setGuesses] = useState(storedGuesses)
    const [guessStatus, setGuessStatus] = useState({ status: "", message: "", result: "" })
    const [guess, setGuess] = useState("")
    const [maxAttempts] = useState(6)
    const [endGamePopUp, toggleEndGamePopUp] = useToggle(false)
    const client = new WordleClient();

    const fetchData = async () => {
        const getLastGameStatusResponse = await client.getLastGameStatus();
        localStorage.setItem("guesses", JSON.stringify(getLastGameStatusResponse.guesses));
        setGuesses(getLastGameStatusResponse.guesses);
    };

    useEffect(() => {
        fetchData();
    }, [gameId]);

    const handleChange = (e) => { setGuess(e.target.value) }

    const takeAGuess = async () => {
        const takeAGuessResponse = await client.takeAGuess(guess, gameId)
        if (takeAGuessResponse.status === "OK" && guesses.length < maxAttempts) {
            const updatedGuesses = [...guesses, { guess: guess, lettersStatus: takeAGuessResponse.lettersStatus }];
            setGuesses(updatedGuesses);
            localStorage.setItem("guesses", JSON.stringify(updatedGuesses));
        };
        setGuessStatus({ status: takeAGuessResponse.status, message: takeAGuessResponse.message, result: takeAGuessResponse.guessResult })
        setGuess("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        takeAGuess();
    }

    const isOver = (guessStatus.result === "GUESSED") || (guesses.length === maxAttempts)

    useEffect(() => {
        if (isOver) {
            setTimeout(() => {
                toggleEndGamePopUp()
            }, 2000);
        }
    }, [isOver])

    // Snackbar 
    const [snackPack, setSnackPack] = useState([]);
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [messageInfo, setMessageInfo] = useState(undefined);

    useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            setMessageInfo({ ...snackPack[0] });
            setSnackPack((prev) => prev.slice(1));
            setOpenSnackbar(true);
        } else if ((snackPack.length && messageInfo && openSnackBar) || (guesses.length === 6)) {
            // Close an active snack when a new one is added
            setOpenSnackbar(false);
        }
    }, [snackPack, messageInfo, openSnackBar]);

    const updateSnackbarMessage = (message) => {
        const newMessage = { message, key: new Date().getTime() };
        setSnackPack((prev) => [...prev, newMessage]);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    useEffect(() => {
        const gameSnackbarMessage = guessStatus.status === "ERROR" ? guessStatus.message : `Attempts left: ${(maxAttempts - guesses.length)}`;
        updateSnackbarMessage(gameSnackbarMessage); // Update the Snackbar message immediately
    }, [guessStatus, maxAttempts]);

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
                    handleClick={() => takeAGuess()}
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