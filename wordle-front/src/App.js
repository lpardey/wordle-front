import SignIn from "./SignIn";
import Typography from "@mui/material/Typography";

function App() {
  const titleStyle = { display: "flex", justifyContent: "center", margin: "auto", marginTop: 50, color: "#8B38F7", fontWeight: "bold" }
  return (
    <>
      <Typography style={titleStyle} component={"h1"} variant="h3">WORDLEMATIC</Typography>
      <SignIn />
    </>
  );
}

export default App;

