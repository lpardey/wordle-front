import Box from "@mui/material/Box";
import Game from "../components/Game"
import "../styles/Form.css";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGameStatus from "./hooks/useGameStatus";
import redirectToGame from "../components/helpers/redirectToGame";
import WordleClient from "../client/WordleClient";

export default function Wordlematic() {
    let { userId, gameId } = useParams()
    const client = new WordleClient()
    const [gameStatus, fetchGameStatus] = useGameStatus(client)
    const playAgain = localStorage.getItem("playAgain")
    const navigate = useNavigate()

    useEffect(() => {
        if (gameStatus.gameIsOver && playAgain) {
            redirectToGame(client, userId, navigate, 0)
        }
    });

    return (
        <Box className="form" sx={{ maxWidth: "350px" }}>
            <Game
                client={client}
                gameId={gameId}
                gameStatus={gameStatus}
                fetchGameStatus={fetchGameStatus}
            />
        </Box>
    )
}