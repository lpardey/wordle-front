import Box from "@mui/material/Box";

export default function Image({ imgSrc, imgAlt }) {
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} padding={1}>
            <img src={imgSrc} alt={imgAlt} style={{ width: 350, height: 250 }} />
        </Box>
    )
}