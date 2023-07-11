import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  handleSubmit: () => void;
  isLoading: boolean;
}

export default function Container({
  isOpen,
  onClose,
  children,
  isLoading,
  handleSubmit,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="lg"
      variant="wide"
    >
      <ModalOverlay />
      <ModalContent
        bg="brand.raisinBlack.1"
        borderWidth="3px"
        borderColor="brand.jet"
        borderRadius="1.25rem"
        color="white"
      >
        <ModalHeader>Edit User Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            variant="buttonGradient"
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
