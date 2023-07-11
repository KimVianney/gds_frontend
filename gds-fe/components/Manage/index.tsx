import {
  Box,
  Center,
  cookieStorageManager,
  Grid,
  Spinner,
  useBoolean,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UseGetSession } from "../../state/session/hooks";
import { UseGetUser } from "../../state/user/hooks";
import { IActivePage } from "../../types/manage";
import Layout from "../Layout";
import Analyze from "./Analyze";
import Buttons from "./Buttons";
import EyeTips from "./EyeTips";
import Profile from "./Profile";
import Results from "./Results";

export default function Manage() {
  console.log("I am in the manage content ci page");
  const [activePage, setActivePage] = useState<IActivePage>("analyze");
  const [isLoading, setIsLoading] = useBoolean();
  const router = useRouter();

  const query = router.query as { section: string };
  const user = UseGetUser();
  const session = UseGetSession();

  console.log({ user, session });

  useEffect(() => {
    const sections: IActivePage[] = ["account", "analyze", "results"];

    if (sections.includes(query?.section as IActivePage))
      return setActivePage(query?.section as IActivePage);
  }, [query?.section]);

  return (
    <Layout>
      <Grid
        templateColumns={{ xl: "1fr 4.48fr" }}
        px={{ base: "1rem", md: "2rem", lg: "4rem", xl: "7.5rem" }}
        fontFamily="Nunito"
      >
        <Buttons activePage={activePage} setActivePage={setActivePage} />
        <Box
          borderLeftWidth={{ xl: "3px" }}
          borderTopWidth="3px"
          borderColor="brand.charcoal"
          minH="83vh"
        >
          {isLoading && (
            <Center paddingTop={"2rem"}>
              <Spinner />
            </Center>
          )}
          {activePage === "analyze" && (
            <Analyze token={session.data.token} setActivePage={setActivePage} />
          )}
          {activePage === "results" && (
            <Results user={user} token={session.data.token} />
          )}
          {activePage === "account" && (
            <Profile user={user} token={session.data.token} />
          )}
          {activePage === "tips" && (
            <EyeTips user={user} token={session.data.token} />
          )}
        </Box>
      </Grid>
    </Layout>
  );
}
