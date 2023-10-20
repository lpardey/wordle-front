import SharedLayout from "./pages/SharedLayout";
import Wordlematic from "./pages/Wordlematic";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PageNotFound from "./pages/PageNotFound";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/:playerId/:gameId" element={<Wordlematic />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

