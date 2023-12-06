import { useState, useEffect } from "react";
import WordleClient from "../../../client/WordleClient";

const useGameLogic = (gameId, initialGuesses, maxAttemps) => {
    const client = new WordleClient();
    const [guess, setGuess] = useState("")
    const [guesses, setGuesses] = useState(initialGuesses || []);
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
