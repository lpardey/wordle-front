import { useState, useEffect } from "react";

const useGameLogic = (client, gameId, maxAttemps) => {
    const [guess, setGuess] = useState("")
    const storedGuesses = JSON.parse(localStorage.getItem("guesses")) || [];
    const [guesses, setGuesses] = useState(storedGuesses);
    const [guessStatus, setGuessStatus] = useState({ status: "", message: "", result: "" });

    const fetchData = async () => {
        const getLastGameStatusResponse = await client.getLastGameStatus();
        localStorage.setItem("guesses", JSON.stringify(getLastGameStatusResponse.guesses));
        setGuesses(getLastGameStatusResponse.guesses);
    };

    const useGameLogicEffect = () => {
        useEffect(() => {
            fetchData();
        }, [gameId]);
    }

    const takeAGuess = async () => {
        const takeAGuessResponse = await client.takeAGuess(guess, gameId)
        if (takeAGuessResponse.status === "OK" && guesses.length < maxAttemps) {
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

    return [guess, guesses, guessStatus, setGuess, takeAGuess, useGameLogicEffect];
};

export default useGameLogic;
