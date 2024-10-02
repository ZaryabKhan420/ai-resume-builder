import React from "react";
import { SignIn } from "@clerk/clerk-react";
const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen">
      <SignIn signUpUrl="/auth/sign-up" forceRedirectUrl="/" />
    </div>
  );
};

export default SignInPage;
