import TextField from "@mui/material/TextField"

export default function GameInput({ guess, handleChange, handleDisabled }) {
    const textSX = { width: "130px", marginTop: "24px" }
    const inputProps = { maxLength: 5, style: { textAlign: "center", textTransform: "uppercase" } }
    return (
        <TextField
            id="standard-basic"
            variant="standard"
            color="secondary"
            autoFocus
            required
            value={guess}
            onChange={handleChange}
            inputProps={inputProps}
            sx={textSX}
            disabled={handleDisabled}
        />
    )
}

// function handleKeyUp(event) {
//     //key code for enter
//     if (event.keyCode === 13) {
//         event.preventDefault();
//         event.target.blur();
//     }
// }