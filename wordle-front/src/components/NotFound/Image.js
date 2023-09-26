import Box from "@mui/material/Box";

export default function Image({ imgSrc, imgAlt }) {
    const boxSX = { display: "flex", justifyContent: "center", alignItems: "center", padding: "8px" }
    const imgStyle = { width: 350, height: 250 }
    return (
        <Box sx={boxSX}>
            <img src={imgSrc} alt={imgAlt} style={imgStyle} />
        </Box>
    )
}