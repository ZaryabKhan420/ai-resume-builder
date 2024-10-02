import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import SignInPage from "./auth/sign-in/SignInPage.jsx";
import SignUpPage from "./auth/sign-up/SignUpPage.jsx";
import {
  HomePage,
  DashboardPage,
  EditResumePage,
  ViewResumePage,
} from "./pages/index.js";
import { ClerkProvider } from "@clerk/clerk-react";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route
          path="/dashboard/resume/:resumeId/edit"
          element={<EditResumePage />}
        />
      </Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/my-resume/:resumeId/view" element={<ViewResumePage />} />
      <Route path="/auth/sign-in" element={<SignInPage />} />
      <Route path="/auth/sign-up" element={<SignUpPage />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router}></RouterProvider>
    </ClerkProvider>
  </StrictMode>
);
