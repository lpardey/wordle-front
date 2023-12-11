import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PopUpContent from "../PopUp/PopUpContent";
import { boxPopUpSX } from "../../styles/Styles";
import Timer from "../Timer";

export default function EndGamePopUp({ open, handleClose, gameResult, winnerTitle, winnerMessage, gameOverTitle, gameOverMessage,  gameFinishedDate, shouldTimerStart }) {
    const [title, message] = getContent(gameResult, winnerTitle, winnerMessage, gameOverTitle, gameOverMessage)
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={boxPopUpSX}>
                <PopUpContent title={title} message={message} />
                <Timer gameFinishedDate={gameFinishedDate} />
            </Box>
        </Modal>
    )
}

function getContent(gameResult, winnerTitle, winnerMessage, gameOverTitle, gameOverMessage) {
    let title;
    let message;
    if (gameResult === "VICTORY") {
        title = winnerTitle
        message = winnerMessage
    } else {
        title = gameOverTitle
        message = gameOverMessage
    }
    return [title, message]
}