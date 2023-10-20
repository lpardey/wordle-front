import Typography from "@mui/material/Typography"

export default function PopUpContent({ title, message }) {
    return (
        <>
            <Typography id="child-modal-title" variant="h6" component="h2" fontWeight={"bold"}>
                {title}
            </Typography>
            <Typography id="child-modal-description" sx={{ mt: 2 }}>
                {message}
            </Typography>
        </>
    )
}