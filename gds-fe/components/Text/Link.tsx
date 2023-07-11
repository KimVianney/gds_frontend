import { Text, TextProps } from "@chakra-ui/react";

interface Props {
  label: string;
  onClick?: () => void;
  props?: TextProps;
}

const Link = ({ label, props, onClick }: Props) => {
  return (
    <Text
      textColor="brand.blueCrayola"
      cursor="pointer"
      _hover={{ textDecoration: "underline" }}
      onClick={onClick}
      {...props}
    >
      {label}
    </Text>
  );
};

export default Link;
