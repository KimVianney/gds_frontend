import { Box, Flex } from "@chakra-ui/react";
import Layout from "../../Layout";
import LoginContent from "../Forms/Login";

const Login = () => {
  return (
    <Layout>
      <Flex
        px={{ base: "1rem", sm: "3rem", md: "3rem", lg: "4rem", xl: "7.5rem" }}
        fontFamily="Nunito"
        mb="2rem"
        flexDir="column"
        height="100%"
        flexGrow={1}
        alignItems="center"
        justifyContent="center"
      >
        <LoginContent />
      </Flex>
    </Layout>
  );
};

export default Login;
