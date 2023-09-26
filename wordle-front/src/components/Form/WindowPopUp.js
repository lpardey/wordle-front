import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import SuccessPopUpContent from "../PopUp/SuccessPopUpContent";
import FailPopUpContent from "../PopUp/FailPopUpContent";
import "../../styles/box.css"

export default function WindowPopUp({ open, handleClose, isSuccess, succesTitle, succesMessage, failTitle, failMessage }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isSuccess ? 400 : 330,
        bgcolor: 'background.paper',
        border: '4px solid #8B38F7',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={style}>
                {isSuccess ?
                    <SuccessPopUpContent successTitle={succesTitle} successMessage={succesMessage} />
                    :
                    <FailPopUpContent failTitle={failTitle} failMessage={failMessage} />
                }
            </Box>
        </Modal>
    )
}