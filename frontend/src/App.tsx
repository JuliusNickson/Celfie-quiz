import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { QuizProvider } from "./store/QuizContext";

export default function App() {
  return (
    <QuizProvider>
      <RouterProvider router={router} />
    </QuizProvider>
  );
}
