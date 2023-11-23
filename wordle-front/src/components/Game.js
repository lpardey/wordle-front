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
import useSnackbarLogic from "./helpers/Game/useSnackbarLogic.js";
import useGameStatus from "../pages/hooks/useGameStatus.js";

export default function Game() {
    let { gameId } = useParams()
    const client = new WordleClient();
    const storedGuesses = JSON.parse(localStorage.getItem("guesses")) || [];
    const [guesses, setGuesses] = useState(storedGuesses)
    const [gameStatus, useGameStatusEffect] = useGameStatus(gameId)
    const { currentStatus, gameGuesses, gameResult, gameFinishedDate, gameIsOver } = gameStatus
    const [guessStatus, setGuessStatus] = useState({ status: "", message: "", result: "" })
    const [guess, setGuess] = useState("")
    const [maxAttempts] = useState(6)
    const [endGamePopUp, toggleEndGamePopUp] = useToggle(false)

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
        setGuessStatus({
            status: takeAGuessResponse.status,
            message: takeAGuessResponse.message,
            result: takeAGuessResponse.guessResult,
        })
        setGuess("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        takeAGuess();
    }

    useEffect(() => {
        if (gameIsOver) {
            toggleEndGamePopUp()
        }
    }, [currentStatus])

    // useSnackbarLogic
    const {
        openSnackBar,
        messageInfo,
        useSetUpSnackbarEffect,
        useUpdateSnackbarEffect,
        handleCloseSnackbar,
        handleExitedSnackbar,
    } = useSnackbarLogic(currentStatus, guessStatus, maxAttempts, guesses);
    // Apply encapsulated useEffects
    useSetUpSnackbarEffect();
    useUpdateSnackbarEffect();
    useGameStatusEffect();

    return (
        <>
            <GameBoard guesses={guesses} maxAttempts={maxAttempts} />
            <form onSubmit={handleSubmit} style={gameFormStyle}>
                <GameInput
                    guess={guess}
                    handleChange={handleChange}
                    handleDisabled={gameIsOver}
                />
                <GameButton
                    buttonText={"Guess"}
                    handleMouseDown={(e) => e.preventDefault()}
                    handleDisabled={gameIsOver}
                />
                <GameSnackbar
                    key={messageInfo ? messageInfo.key : undefined}
                    open={openSnackBar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    handleExited={handleExitedSnackbar}
                    message={messageInfo ? messageInfo.message : undefined}
                />
                <EndGamePopUp
                    open={endGamePopUp}
                    handleClose={!gameIsOver ? toggleEndGamePopUp : null}
                    gameResult={gameResult}
                    winnerTitle={"IT'S A MATCH!"}
                    winnerMessage={"Congratulations, you guessed the word."}
                    gameOverTitle={"GAME OVER!"}
                    gameOverMessage={"Game word: 'xxx'."}
                />
            </form>
        </>
    )
}