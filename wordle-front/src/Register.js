import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Register({ showPassword, handleClickShowPassword, handleClickRegister, handleMouseDownPassword, btnStyle }) {
    return (
        <>
            <Typography sx={{ m: 1 }} variant="h5" component={"h2"}>Register</Typography>
            <FormControl sx={{ m: 1, width: '25ch', backgroundColor: "white" }} variant="outlined" color="secondary" required>
                <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
                <OutlinedInput id="outlined-adornment-username" label="Username" />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch', backgroundColor: "white" }} variant="outlined" color="secondary" required>
                <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                <OutlinedInput id="outlined-adornment-username" label="Email" />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch', backgroundColor: "white" }} variant="outlined" color="secondary" required>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <Button type="submit" variant="contained" style={btnStyle}>Submit</Button>
            <Typography variant="subtitle1">Do you have an account? <Link color={"#8B38F7"} href="#" onClick={handleClickRegister} >Log In!</Link></Typography>
        </>
    )
}
export default Register