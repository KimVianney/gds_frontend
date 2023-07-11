import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import User from "../../../../types/User";
import { gravatar } from "../../../auth/Forms/Login";
import Edit from "../Edit";
import Section from "../Section";

interface Props {
  user: User;
  token: string;
}

export default function TopCard({ user, token }: Props) {
  const { first_name, last_name, email, avatar } = user;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box w="100%" p={{ base: "1.2rem", sm: "2rem" }}>
        <Flex justify="flex-end" align="center" mb="1.875rem">
          <Text
            onClick={onOpen}
            _hover={{ textDecor: "underline" }}
            cursor="pointer"
            fontWeight="400"
            fontSize="0.875rem"
            lineHeight="1.375rem"
            textColor="brand.azure"
          >
            Edit
          </Text>
        </Flex>
        <Avatar
          size="2xl"
          name="Segun Adebayo"
          src={avatar || gravatar(email)}
          mb="2rem"
        >
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
        <Section left="First name" right={first_name} />
        <Section left="Last name" right={last_name} />
        <Section left="Email" right={email} />
      </Box>
      <Edit onClose={onClose} isOpen={isOpen} user={user} token={token} />
    </>
  );
}
