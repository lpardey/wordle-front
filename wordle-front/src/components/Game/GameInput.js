import  TextField  from "@mui/material/TextField"

export default function GameInput({ guess, handleChange }) {
    return (
        <TextField
            id="standard-basic"
            variant="standard"
            value={guess}
            onChange={handleChange}
            required inputProps={{ style: { textAlign: "center", textTransform: "uppercase" } }}
            sx={{ width: 150, marginTop: 3 }}
        />
    )
}