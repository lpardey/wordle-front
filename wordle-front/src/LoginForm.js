import { Grid, Paper, Avatar, TextField, Button, Typography,Link } from "@mui/material"
import LockIcon from "@mui/icons-material/Lock";

function LoginForm() {
    const paperStyle={padding: 20, height:"50vh", width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:"purple"}
    const btnstyle={margin:"18px 0"}
    return(
        <Grid >
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                     <Avatar style={avatarStyle}><LockIcon/></Avatar>
                    <h2>Wordlmatic Account</h2>
                    <form>
                <TextField placeholder="Username" fullWidth required/>
                <TextField placeholder="Password" type="password" fullWidth required/>
                <Button type="submit" color="primary" variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                    </form>
                <Typography >No account? <Link href="#" >Register!</Link></Typography>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default LoginForm