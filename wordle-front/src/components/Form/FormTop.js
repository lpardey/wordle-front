import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"

export default function FormTop({ topText, icon }) {
    return (
        <>
            <Avatar sx={{ backgroundColor: "purple", width: 60, height: 60 }}>
                {icon}
            </Avatar>
            <Typography component={"h2"} variant="h5" sx={{ marginTop: 1, marginBottom: 1, }}>
                {topText}
            </Typography>
        </>
    )
}
