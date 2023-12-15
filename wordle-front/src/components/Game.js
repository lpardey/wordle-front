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
import { useEffect } from "react";

export default function Game() {
    let { gameId } = useParams()

    // Game Status
    const [gameStatus, fetchGameStatus] = useGameStatus()
    const { currentStatus,
        gameWord,
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
    ] = useGameLogic(gameId, gameMaxAttempts)

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

    // Everytime take a guess runs we return an updated game status
    useEffect(() => {
        fetchGameStatus();
    }, [guesses])

    // Apply encapsulated useEffects
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
                    winnerMessage={`'${gameWord}' is the word for this game.`}
                    gameOverTitle={"GAME OVER!"}
                    gameOverMessage={`'${gameWord}' is the word for this game.`}
                    gameId={gameId}
                    gameFinishedDate={gameFinishedDate}
                />
            </form>
        </>
    )
}