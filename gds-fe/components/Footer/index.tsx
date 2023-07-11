import { Box, Center, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Center bg="brand.teaGreen" py="1rem">
      <Text
        fontFamily="Nunito"
        fontWeight="500"
        textColor="brand.sonicSilver"
        textAlign="center"
      >
        Copyright &copy; 2023 GDS
      </Text>
    </Center>
  );
}
