import { useState, useEffect } from "react";

const useSnackbarLogic = (currentStatus, guessStatus, maxAttempts, guesses) => {
    const [snackPack, setSnackPack] = useState([]);
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [messageInfo, setMessageInfo] = useState(undefined);

    const useSetUpSnackbarEffect = () => {
        useEffect(() => {
            if (snackPack.length && !messageInfo) {
                // Set a new snack when we don't have an active one
                setMessageInfo({ ...snackPack[0] });
                setSnackPack((prev) => prev.slice(1));
                setOpenSnackbar(true);
            } else if ((snackPack.length && messageInfo && openSnackBar) || (currentStatus === "FINISHED")) {
                // Close an active snack when a new one is added
                setOpenSnackbar(false);
            }
        });
    }

    const useUpdateSnackbarEffect = () => {
        useEffect(() => {
            const snackbarMessage = getMessage(currentStatus, guessStatus, maxAttempts, guesses)
            updateSnackbarMessage(snackbarMessage); // Update the Snackbar message immediately
        }, [currentStatus, guessStatus, guesses]);
    }

    const updateSnackbarMessage = (message) => {
        const newMessage = { message, key: new Date().getTime() };
        setSnackPack((prev) => [...prev, newMessage]);
    };

    const getMessage = (currentStatus, guessStatus, maxAttempts, guesses) => {
        const { status, message } = guessStatus;
        const attempts = maxAttempts - guesses.length;

        if (currentStatus === "WAITING_FOR_GUESS") {
            return status === "ERROR" ? message : `Attempts left: ${attempts}`;
        }

        return null;
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleExitedSnackbar = () => {
        setMessageInfo(undefined)
    }

    return [
        openSnackBar,
        messageInfo,
        useSetUpSnackbarEffect,
        useUpdateSnackbarEffect,
        handleCloseSnackbar,
        handleExitedSnackbar,
    ]
}

export default useSnackbarLogic