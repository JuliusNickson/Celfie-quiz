import { createBrowserRouter } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
import LandingPage from "../pages/LandingPage";
import QuizPage from "../pages/QuizPage";
import RegistrationPage from "../pages/RegistrationPage";
import ResultPage from "../pages/ResultPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    path: "/quiz",
    element: <QuizPage />,
  },
  {
    path: "/result",
    element: <ResultPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);
