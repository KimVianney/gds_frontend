import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Login from "../components/auth/Login";
import { UseGetAuth } from "../state/auth/hooks";

const Home: NextPage = () => {
  const router = useRouter();
  const auth = UseGetAuth();

  useEffect(() => {
    if (auth.isLoggedIn && router) {
      router.push("/manage");
    }
  }, [router, auth.isLoggedIn]);

  return <Login />;
};

export default Home;
