import GameBoard from "./Game/GameBoard";
import GameInput from "./Game/GameInput";
import GameButton from "./Game/GameButton";
import { useState } from "react";
import axios from "axios"

export default function Wordle() {
    // Get game status info(game word: str, guesses: list[dict[str, list[int]]], game_id) 
    // from api endpoint: http://wordle_back:8000/game/`${game_id}`.
    // Update state base on game status
    // letters_status -> 0 in place, 1 present, 2 not present
    const [gameId, setGameId] = useState(0)
    const [gameWord, setGameWord] = useState("CYDER")
    const [guesses, setGuesses] = useState([{ word: "CLOUD", letters_status: [0, 2, 2, 2, 1] }, { word: "PIZZA", letters_status: [2, 2, 2, 2, 2] }, { word: "CLOUD", letters_status: [0, 2, 2, 2, 1] }, { word: "CYDER", letters_status: [0, 0, 0, 0, 0] }, { word: "PIZZA", letters_status: [2, 2, 2, 2, 2] }])
    const [attempts, setAttempts] = useState(5)
    const [gameStatus, setGameStatus] = useState("WAITING_FOR_GUESS")
    const [guess, setGuess] = useState("")
    const [maxAttempts, setMaxAttempts] = useState(6)
    const getBackgroundColor = (number) => number === 0 ? "#61D78C" : number === 1 ? "#F1F483" : "#797979"

    const handleChange = (e) => { setGuess(e.target.value) }

    const handleSubmit = (e) => { e.preventDefault(); postGuess() }
    const postGuess = () => {
        const url = "`http://localhost:8000/${player_id}/${game_id}/guess`"
        axios.post(url, guess).then((response) => {
            setGuess("")
        }).catch(error => console.error(`Error ${error}`));
    }
    return (
        <>
            <GameBoard guesses={guesses} getbgC={getBackgroundColor} />
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
                <GameInput guess={guess} handleChange={handleChange} />
                <GameButton buttonText={"Guess"} />
            </form>
        </>
    )
}