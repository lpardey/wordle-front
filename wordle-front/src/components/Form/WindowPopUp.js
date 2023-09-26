import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PopUpContent from "../PopUp/PopUpContent";
import { boxPopUpSX } from "../../styles/Styles";

export default function WindowPopUp({ open, handleClose, isSuccess, succesTitle, succesMessage, failTitle, failMessage }) {
    const title = isSuccess ? succesTitle : failTitle
    const message = isSuccess ? succesMessage : failMessage
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