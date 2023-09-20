import Button from "@mui/material/Button"

export default function FormButton({ buttonText }) {
    return (
        <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
                marginTop: 1,
                marginBottom: 1,
                backgroundColor: "#8B38F7",
                "&:hover": { backgroundColor: "#700af5" }
            }}
        >
            {buttonText}
        </Button>
    )
}