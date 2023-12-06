import GameBoard from "./Game/GameBoard";
import GameInput from "./Game/GameInput";
import GameButton from "./Game/GameButton";
import GameSnackbar from "./Game/GameSnackbar";
import EndGamePopUp from "./Game/EndGamePopUp";
import { gameFormStyle } from "../styles/Styles";
import { useParams } from "react-router-dom";
import useSnackbarLogic from "./helpers/Game/useSnackbarLogic.js";
import useGameStatus from "../pages/hooks/useGameStatus.js";
import useGameLogic from "./helpers/Game/useGameLogic.js";
import useEndGamePopUpLogic from "./helpers/Game/useEndGamePopUp.js";

export default function Game() {
    let { gameId } = useParams()
    const storedGuesses = JSON.parse(localStorage.getItem("guesses")) || [];

    // Game Status
    const [gameStatus, useGameStatusEffect] = useGameStatus(gameId)
    const { currentStatus,
        gameMaxAttempts,
        gameGuesses,
        gameResult,
        gameFinishedDate,
        gameIsOver,
    } = gameStatus

    // Game Logic
    const [guess,
        guesses,
        guessStatus,
        setGuess,
        takeAGuess,
        useGameLogicEffect
    ] = useGameLogic(gameId, storedGuesses, gameMaxAttempts)

    // Snackbar Logic
    const [
        openSnackBar,
        messageInfo,
        useSetUpSnackbarEffect,
        useUpdateSnackbarEffect,
        handleCloseSnackbar,
        handleExitedSnackbar,
    ] = useSnackbarLogic(currentStatus, guessStatus, gameMaxAttempts, guesses);

    // EndGamePopUp Logic
    const [endGamePopUp,
        toggleEndGamePopUp,
        useEndGamePopUpLogicEffect
    ] = useEndGamePopUpLogic(currentStatus, gameIsOver)

    const handleChange = (e) => {
        setGuess(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        takeAGuess();
    }

    // Apply encapsulated useEffects
    useGameStatusEffect();
    useGameLogicEffect();
    useSetUpSnackbarEffect();
    useUpdateSnackbarEffect();
    useEndGamePopUpLogicEffect();

    return (
        <>
            <GameBoard guesses={guesses} maxAttempts={gameMaxAttempts} />
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