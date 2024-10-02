import React from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Outlet, useNavigate } from "react-router-dom";
import { Header, Footer } from "./components/index";
import { useUser } from "@clerk/clerk-react";
import { Toaster } from "@/components/ui/sonner";
function App() {
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  if (!isSignedIn && isLoaded) {
    return navigate("/auth/sign-in");
  }

  return (
    <div className="container">
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
