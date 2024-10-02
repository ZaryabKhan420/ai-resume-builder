import React from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import logo from "/logo.svg";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <header className="h-[10vh] flex justify-between items-center">
      <div>
        <img
          src={logo}
          alt="Logo"
          loading="lazy"
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <div>
        {isSignedIn ? (
          <div className="flex justify-center items-center gap-3">
            <Link to={"/dashboard"}>
              <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <Link to={"/auth/sign-in"}>
            <Button>Get Started</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
