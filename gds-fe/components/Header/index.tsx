import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Flex,
  Text,
  TextProps,
} from "@chakra-ui/react";
import Link from "next/link";
import { BiMenuAltRight } from "react-icons/bi";
import { navigateTo } from "../../utils/navigation";

interface CustomLinkProps {
  text: string;
  props?: TextProps;
  uri: string;
}

interface Props {
  props?: BoxProps;
}

function CustomLink({ text, props, uri }: CustomLinkProps) {
  return (
    <Link href={uri} passHref>
      <a>
        <Text
          mx="2rem"
          cursor="pointer"
          _hover={{ textColor: "brand.maximumBlue" }}
          {...props}
        >
          {text}
        </Text>
      </a>
    </Link>
  );
}

export default function Header({ props }: Props) {
  return (
    <Box {...props}>
      <Accordion allowToggle>
        <AccordionItem borderBottom="0" borderTopColor="brand.raisinBlack.1">
          <Flex
            h={{ base: "5rem", sm: "7rem" }}
            px={{ base: "1rem", md: "2rem", lg: "4rem", xl: "7.5rem" }}
            justify="space-between"
            align="center"
          >
            <Text
              textColor="white"
              fontWeight="600"
              fontSize="1.7rem"
              align="center"
              cursor="pointer"
              _hover={{ textColor: "brand.maximumBlue" }}
              bg="brand.spaceCadet"
              px="1rem"
              py="0.5rem"
              borderRadius="1rem"
              onClick={() => navigateTo("/")}
            >
              Glaucoma Detection System
            </Text>

            <Flex
              align="center"
              fontWeight="400"
              fontSize="1.1rem"
              display={{ base: "none", md: "flex" }}
            >
              <CustomLink text="Help" uri="/help" />
              <CustomLink
                text="Contact Us"
                uri="mailto:kimvianney6@gmail.com"
              />
            </Flex>

            <Box
              transition="background-color 500ms linear"
              bg="brand.jet"
              borderRadius="10"
              _hover={{ bg: "none" }}
              cursor="pointer"
              display={{ base: "block", md: "none" }}
            >
              <AccordionButton p="1">
                <BiMenuAltRight size="40" />
              </AccordionButton>
            </Box>
          </Flex>
          <AccordionPanel pb={4} display={{ base: "block", md: "none" }}>
            <CustomLink text="Help" uri="/help" props={{ my: "0.5rem" }} />
            <CustomLink
              text="Contact Us"
              uri="mailto:kimvianney6@gmail.com?suject=GDSHelp Needed"
              props={{ my: "0.5rem" }}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
