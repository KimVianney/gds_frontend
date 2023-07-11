import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";
import Popups from "../Popups";

interface Props {
  children: ReactNode;
  headerProps?: BoxProps;
}

export default function Layout({ children, headerProps }: Props) {
  return (
    <Flex
      bg="brand.raisinBlack.1"
      height="100%"
      minH="100vh"
      textColor="brand.cultured"
      fontFamily="Nunito"
      flexDir="column"
    >
      <Header props={headerProps} />
      {children}
      <Footer />
    </Flex>
  );
}
