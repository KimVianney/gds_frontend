import { Box, Grid } from "@chakra-ui/react";
import FAQs from "./faqs";
import Layout from "../Layout";
import Video from "./video";

const Help = () => {
  return (
    <Layout>
      <Grid
        px={{ base: "1rem", md: "2rem", lg: "4rem", xl: "7.5rem" }}
        fontFamily="Nunito"
        templateColumns={{ lg: "2fr 1.3fr" }}
        gap="1.5rem"
      >
        <FAQs />
        <Video />
      </Grid>
    </Layout>
  );
};

export default Help;
