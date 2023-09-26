import Typography from "@mui/material/Typography"

export default function SuccessPopUpContent({ successTitle, successMessage }) {
    return (
        <>
            <Typography id="child-modal-title" variant="h6" component="h2" fontWeight={"bold"}>
                {successTitle}
            </Typography>
            <Typography id="child-modal-description" sx={{ mt: 2 }}>
                {successMessage}
            </Typography>
        </>
    )
}