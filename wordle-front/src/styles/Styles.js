const boxPopUpSX = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 370,
    bgcolor: 'background.paper',
    border: '4px solid #8B38F7',
    boxShadow: 24,
    p: 4,
};

const formButtonSX = {
    marginTop: "8px",
    marginBottom: "8px",
    backgroundColor: "#8B38F7",
    "&:hover": { backgroundColor: "#700af5" }
}

const gameButtonSX = {
    fontSize: "13px",
    marginTop: "16px",
    backgroundColor: "#8B38F7",
    "&:hover": { backgroundColor: "#700af5" }
}

const gameFormStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

const sharedLayoutTitleSX = {
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    marginTop: "40px",
    color: "#8B38F7",
    fontWeight: "bold"
}

export { boxPopUpSX, formButtonSX, gameButtonSX, gameFormStyle, sharedLayoutTitleSX }