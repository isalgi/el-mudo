import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MenuPage from "./pages/MenuPage";
import DetailMenuPage from "./pages/DetailMenuPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./route/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/detail/:id" element={<DetailMenuPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
