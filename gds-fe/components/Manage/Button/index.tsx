import { Flex, Text } from "@chakra-ui/react";
import { useWindowSize } from "../../../hooks/useWindowSize";

interface ButtonProps {
  label: string;
  active: boolean;
  icon: JSX.Element;
  onClick: () => void;
}

export default function Button({ label, active, icon, onClick }: ButtonProps) {
  const { width } = useWindowSize();
  const dontDisplayLabel = width < 640 && !active;

  return (
    <Flex
      justifyContent={{ base: "space-around", lg: "start" }}
      flexGrow={1}
      h="2.5rem"
      bg={active ? "brand.jet" : "none"}
      pl={{ lg: "2rem" }}
      align="center"
      cursor="pointer"
      fontSize="0.875rem"
      lineHeight="1.375rem"
      _hover={{ bg: "brand.jet" }}
      color={active ? "white" : "brand.indepedence"}
      onClick={onClick}
    >
      {icon}
      {!dontDisplayLabel && (
        <Text mr="10" pl="3px">
          {label}
        </Text>
      )}
    </Flex>
  );
}
