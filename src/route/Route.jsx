import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MenuPage from "../pages/MenuPage";
import DetailMenuPage from "../pages/DetailMenuPage";
import ProtectedRoute from "./ProtectedRoute";

export const route = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/menu",
    element: (
      <ProtectedRoute>
        <MenuPage />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/detail/:id",
    element: (
      <ProtectedRoute>
        <DetailMenuPage />,
      </ProtectedRoute>
    ),
  },
];
