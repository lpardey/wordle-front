import Button from "@mui/material/Button"

export default function GameButton({ buttonText }) {
    return (
        <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{
                width: 5,
                fontSize: 13,
                marginTop: 2,
                backgroundColor: "#8B38F7",
                "&:hover": { backgroundColor: "#700af5" }
            }}
        >
            {buttonText}
        </Button>
    )
}