import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function Input({ label, value, handleChange, type, icon = null }) {
    const lowerCaseLabel = label.toLowerCase()
    return (
        <FormControl
            margin="normal"
            variant="outlined"
            color="secondary"
            required
            fullWidth
            sx={{ marginTop: 1, marginBottom: 1, backgroundColor: "white" }}
        >
            <InputLabel htmlFor={`outlined-adornment-${lowerCaseLabel}`} >{label}</InputLabel>
            <OutlinedInput
                id={`outlined-adornment-${lowerCaseLabel}`}
                name={lowerCaseLabel}
                value={value}
                onChange={handleChange} label={label} type={type} endAdornment={icon}
            />
        </FormControl>
    )
}