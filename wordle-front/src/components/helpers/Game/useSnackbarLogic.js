import { useState, useEffect } from "react";

const useSnackbarLogic = (guessStatus, maxAttempts, guesses) => {
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
            } else if ((snackPack.length && messageInfo && openSnackBar) || (guesses.length === 6) || (guesses.length === 0)) {
                // Close an active snack when a new one is added
                setOpenSnackbar(false);
            }
        }, [snackPack, messageInfo, openSnackBar, setSnackPack]);
    }

    const updateSnackbarMessage = (message) => {
        const newMessage = { message, key: new Date().getTime() };
        setSnackPack((prev) => [...prev, newMessage]);
    };

    const useUpdateSnackbarEffect = () => {
        useEffect(() => {
            const gameSnackbarMessage = guessStatus.status === "ERROR"
                ? guessStatus.message
                : `Attempts left: ${(maxAttempts - guesses.length)}`;
            updateSnackbarMessage(gameSnackbarMessage); // Update the Snackbar message immediately
        }, [guessStatus, maxAttempts, guesses]);
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

    return {
        openSnackBar,
        messageInfo,
        useSetUpSnackbarEffect,
        useUpdateSnackbarEffect,
        handleCloseSnackbar,
        handleExitedSnackbar,
    }
}

export default useSnackbarLogic