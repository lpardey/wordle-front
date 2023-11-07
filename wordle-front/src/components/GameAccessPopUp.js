import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PopUpContent from "./PopUp/PopUpContent";
import { boxPopUpSX } from "../styles/Styles";
import useGameStatus from "../pages/hooks/useGameStatus";

export default function GameAccessPopUp() {
    const [isGameOngoing, gameFinishedDate] = useGameStatus()
    const targetTime = new Date(gameFinishedDate);
    const nextGameTime = 24
    targetTime.setHours(targetTime.getHours() + nextGameTime);
    const title = "Enough Wordlematic for today!"
    const message = `Don't worry, you'll be able to play again in...` + isGameOngoing + gameFinishedDate;
    return (
        <Modal
            open={true}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={boxPopUpSX}>
                <PopUpContent title={title} message={message} />
                {/* <Timer expiryTimestamp={expiryTimestamp} shouldTimerStart={shouldTimerStart} /> */}
            </Box>
        </Modal>
    )
}