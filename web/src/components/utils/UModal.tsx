import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";

export function UModal({
  isOpen,
  onOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
}): JSX.Element {
  const modalSize = "6xl";

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      size={modalSize}
      scrollBehavior="inside"
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody px={4} pt={12} pb={4}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
