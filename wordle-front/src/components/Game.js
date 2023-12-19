import GameBoard from "./Game/GameBoard";
import GameInput from "./Game/GameInput";
import GameButton from "./Game/GameButton";
import GameSnackbar from "./Game/GameSnackbar";
import EndGamePopUp from "./Game/EndGamePopUp";
import { useEffect } from "react";
import useSnackbarLogic from "./helpers/Game/useSnackbarLogic.js";
import useGameLogic from "./helpers/Game/useGameLogic.js";
import useEndGamePopUpLogic from "./helpers/Game/useEndGamePopUp.js";
import { gameFormStyle } from "../styles/Styles";

export default function Game({ client, gameId, gameStatus, fetchGameStatus }) {
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
    ] = useGameLogic(client, gameId, gameMaxAttempts)

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
        endGameMessage,
        useEndGamePopUpLogicEffect
    ] = useEndGamePopUpLogic(currentStatus, gameIsOver, gameWord)


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
                    winnerMessage={endGameMessage}
                    gameOverTitle={"GAME OVER!"}
                    gameOverMessage={endGameMessage}
                    gameId={gameId}
                    gameFinishedDate={gameFinishedDate}
                />
            </form>
        </>
    )
}