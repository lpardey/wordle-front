import SharedLayout from "./pages/SharedLayout";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Game />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

