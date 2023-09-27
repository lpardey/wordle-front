import Snackbar from "@mui/material/Snackbar"

export default function GameSnackbar({ open, autoHideDuration, onClose, statusResult, statusMessage, attempts, maxAttempts }) {
    const message = !statusResult ? statusMessage : `Attempts left: ${maxAttempts - attempts}`
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            message={message}
        />
    )
}
