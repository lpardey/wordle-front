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

function RegisterHook({ showPassword, handleClickLogIn, handleClickShowPassword, handleMouseDownPassword, btnStyle }) {
    return (
        <>
            <Typography variant="h5" component={"h2"}>Register</Typography>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
                <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
                <OutlinedInput id="outlined-adornment-username" label="Username" />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
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
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
                <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                <OutlinedInput id="outlined-adornment-username" label="Email" />
            </FormControl>
            <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>Register</Button>
            <Typography variant="subtitle1">Do you have an account? <Link href="#" onClick={handleClickLogIn} >Log In!</Link></Typography>
        </>
    )
}
export default RegisterHook