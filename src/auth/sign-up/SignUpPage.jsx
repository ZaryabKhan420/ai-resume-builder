import React from "react";
import { SignUp } from "@clerk/clerk-react";
const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen">
      <SignUp signInUrl="/auth/sign-in" forceRedirectUrl="/" />
    </div>
  );
};

export default SignUpPage;
