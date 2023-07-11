import { Center } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface Props {
  position: string;
  children: ReactNode;
  isVisibile?: boolean;
}

const Overlay: FC<Props> = ({ isVisibile, children }) => {
  const display = isVisibile ? "block" : "none";
  return (
    <Center
      pos="fixed"
      display={display}
      w="full"
      h="full"
      top={0}
      left={0}
      bottom={0}
      right={0}
      backgroundColor="rgba(0,0,0,0.5)"
      zIndex={10}
      cursor="pointer"
    >
      {children}
    </Center>
  );
};

export default Overlay;
