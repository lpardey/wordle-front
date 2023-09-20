import Box from "@mui/material/Box"

export default function Letter({ letter, backgroundColor }) {
    return (
        <Box
            display={"flex"}
            border={1}
            boxSizing={"content-box"}
            width={60}
            height={50}
            textAlign={"center"}
            alignItems="center"
            justifyContent={"center"}
            fontSize={50}
            color={"white"}
            sx={{ backgroundColor: backgroundColor }}
        >
            {letter}
        </Box>
    )
}