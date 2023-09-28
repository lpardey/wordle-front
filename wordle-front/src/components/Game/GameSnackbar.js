import Snackbar from "@mui/material/Snackbar"

export default function GameSnackbar({ key, open, autoHideDuration, onClose, handleExited, message }) {
    return (
        <Snackbar
            key={key}
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            TransitionProps={{onExited:handleExited}}
            message={message}
        />
    )
}
