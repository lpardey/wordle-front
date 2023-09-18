import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import axios from "axios"
import { useEffect, useState } from "react"


export default function Game() {
    // Get game status info(game word: str, guesses: list[dict[str, list[int]]], game_id) 
    // from api endpoint: http://wordle_back:8000/game/`${game_id}`.
    // Update state base on game status
    // letters_status -> 0 in place, 1 present, 2 not present
    const [gameId, setGameId] = useState(0)
    const [gameWord, setGameWord] = useState("CYDER")
    const [guesses, setGuesses] = useState([{ word: "CLOUD", letters_status: [0, 2, 2, 2, 1] }, { word: "PIZZA", letters_status: [2, 2, 2, 2, 2] }])
    const [attempts, setAttempts] = useState(5)
    const [gameStatus, setGameStatus] = useState("WAITING_FOR_GUESS")
    const [guess, setGuess] = useState("")
    const [maxAttempts, setMaxAttempts] = useState(6)
    const getBackgroundColor = (number) => {
        return number === 0 ? "#D76161" : number === 1 ? "#61D78C" : "#797979"
    }
    const handleChange = (e) => { setGuess(e.target.value) }

    // this maybe a case for useEffect
    // const getGameStatus = (gameId) => {
    //     const url = `http://wordle_back:8000/game/${gameId}`
    //     axios.get(url).then((response) => {
    //         const gameStatus = response.data
    //         setGameWord(gameStatus.game_status_info.game_word)
    //         setGuesses(gameStatus.game_status_info.guesses)
    //         setAttempts(gameStatus.game_status_info.attempts_left)
    //         setGameStatus(gameStatus.game_status_info.game_status)
    //     }).catch(error => console.error(`Error ${error}`));
    // }
    const handleSubmit = (e) => { e.preventDefault(); postGuess() }

    const postGuess = () => {
        const url = "`http://wordle_back:8000//${player_id}/${game_id}/guess`"
        axios.post(url, guess).then((response) => {
            setGuess("")
        }).catch(error => console.error(`Error ${error}`));
    }
    const showGameBoard = (guesses, maxAttempts) => {
        for (let guessIndex = 0; guessIndex < maxAttempts; guessIndex++) {
            const word = guesses[guessIndex].word
            word ?
                (
                    Array(word).forEach(element => {
                        <Box
                            display={"flex"}
                            border={1}
                            boxSizing={"content-box"}
                            width={60}
                            height={50}
                            textAlign={"center"}
                            alignItems="center"
                            justifyContent={"center"}
                            fontSize={50}
                            color={"white"}
                            sx={{ backgroundColor: getBackgroundColor(guesses[guessIndex].letters_status[word.indexOf(element)]) }}
                        >
                            {element}
                        </Box>
                    })
                ) : (
                    Array(5).forEach(element => {
                        <Box
                            display={"flex"}
                            border={1}
                            boxSizing={"content-box"}
                            width={60}
                            height={50}
                            textAlign={"center"}
                            alignItems="center"
                            justifyContent={"center"}
                            fontSize={50}
                            color={"white"}
                            sx={{ backgroundColor: getBackgroundColor(2) }}
                        >
                        </Box>
                    })
                )
        }
    }

    return (
        <>
            <Box
                display={"flex"}
                flexDirection={"column"}
                maxWidth={260}
                alignItems="center"
                justifyContent={"center"}
                margin={"auto"}
                marginTop={5}
                padding={5}
                borderRadius={5}
                boxShadow={"10px 10px 15px #ccc"}
                backgroundColor="#FAF9FA"
                sx={{ ":hover": { boxShadow: "15px 15px 25px #ccc" } }}>

                <h3>Game Word: {gameWord}</h3>

                <h3>Guess: {guesses[0].word}</h3>
                <h3>Esto es {guesses[0].word.length}</h3>

                <Stack direction={"row"}>
                    {/* {showGameBoard(guesses, maxAttempts)} */}
                    <Box
                        display={"flex"}
                        border={1}
                        boxSizing={"content-box"}
                        width={60}
                        height={50}
                        textAlign={"center"}
                        alignItems="center"
                        justifyContent={"center"}
                        fontSize={50}
                        color={"white"}
                        sx={{ backgroundColor: getBackgroundColor(2) }}
                    >
                    </Box>
                    <Box
                        display={"flex"}
                        border={1}
                        boxSizing={"content-box"}
                        width={60}
                        height={50}
                        textAlign={"center"}
                        alignItems="center"
                        justifyContent={"center"}
                        fontSize={50}
                        color={"white"}
                        sx={{ backgroundColor: getBackgroundColor(guesses[0].letters_status[0]) }}
                    >
                        {guesses[0].word.charAt(0)}
                    </Box>
                    <Box
                        display={"flex"}
                        border={1}
                        boxSizing={"content-box"}
                        width={60}
                        height={50}
                        textAlign={"center"}
                        alignItems="center"
                        justifyContent={"center"}
                        fontSize={50}
                        color={"white"}
                        sx={{ backgroundColor: getBackgroundColor(guesses[0].letters_status[1]) }}
                    >
                        {guesses[0].word.charAt(1)}
                    </Box>
                    <Box
                        display={"flex"}
                        border={1}
                        boxSizing={"content-box"}
                        width={60}
                        height={50}
                        textAlign={"center"}
                        alignItems="center"
                        justifyContent={"center"}
                        fontSize={50}
                        color={"white"}
                        sx={{ backgroundColor: getBackgroundColor(guesses[0].letters_status[4]) }}
                    >
                        {guesses[0].word.charAt(4)}
                    </Box>
                </Stack>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <TextField id="standard-basic" variant="standard" value={guess} onChange={handleChange} required inputProps={{ style: { textAlign: "center", textTransform: "uppercase" } }} sx={{ width: 150, marginTop: 3 }} />
                    <Button type="submit" variant="contained" size="small" sx={{ width: 5, fontSize: 13, marginTop: 2, backgroundColor: "#8B38F7", "&:hover": { backgroundColor: "#700af5" } }} >
                        Guess
                    </Button>
                </form>
            </Box>
        </>
    )
}