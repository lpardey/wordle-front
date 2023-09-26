import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"

export default function FormTop({ topText, icon }) {
    const avatarSX = { backgroundColor: "purple", width: "60px", height: "60px" }
    const textSX = { marginTop: "8px", marginBottom: "8px", }
    return (
        <>
            <Avatar sx={avatarSX}>{icon}</Avatar>
            <Typography component={"h2"} variant="h5" sx={textSX}>
                {topText}
            </Typography>
        </>
    )
}
