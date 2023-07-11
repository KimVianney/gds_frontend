import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { UseGetAuth } from "../../state/auth/hooks";

type AuthPropTypes = {
  children?: React.ReactNode;
};

export const Auth: FC<AuthPropTypes> = ({ children }) => {
  console.log("I am in the auth wrapper");
  const auth = UseGetAuth();
  const router = useRouter();

  console.log({ auth, router });

  useEffect(() => {
    if (!auth.isLoggedIn && router) {
      router.push("/");
    }
  }, [router, auth.isLoggedIn]);

  return <>{children}</>;
};

export default Auth;
