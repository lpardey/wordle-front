import Box from "@mui/material/Box";
import NotFound from "../components/NotFound";
import "../styles/Form.css"

export default function PageNotFound() {
    return (
        <Box className="form" sx={{ maxWidth: "350px" }}>
            <NotFound />
        </Box>
    )
}


