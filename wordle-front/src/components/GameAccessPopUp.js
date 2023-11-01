import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PopUpContent from "./PopUp/PopUpContent";
import { boxPopUpSX } from "../styles/Styles";

export default function GameAccessPopUp({ open, handleClose, title, message }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={boxPopUpSX}>
                <PopUpContent title={title} message={message} />
            </Box>
        </Modal>
    )
}