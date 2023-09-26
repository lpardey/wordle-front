import Typography from "@mui/material/Typography"

export default function FailPopUpContent({ failTitle, failMessage }) {
    return (
        <>
            <Typography id="child-modal-title" variant="h6" component="h2" fontWeight={"bold"}>
                {failTitle}
            </Typography>
            <Typography id="child-modal-description" sx={{ mt: 2 }}>
                {failMessage}
            </Typography>
        </>
    )
}