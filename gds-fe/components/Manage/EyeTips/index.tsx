import { Box, Grid } from "@chakra-ui/react";
import FAQs from "./faqs";
import Layout from "../../Layout";
import User from "../../../types/User";
import { FC } from "react";
import { useRouter } from "next/router";

interface Props {
  user: User;
  token: string;
}

const EyeTips: FC<Props> = ({ token, user }) => {
  const router = useRouter();

  if (!token || !user) {
    router.push("/sign-in");
  }

  return <FAQs />;
};

export default EyeTips;
