import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  OrderedList,
  ListItem,
  Button,
} from '@chakra-ui/react'

export default function TermCondition({ isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Term and Conditions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <OrderedList spacing={4}>
              <ListItem>
                Halalanft is not a security or investment instrument that will
                provide financial benefits as traditional investment instruments
                generally do, such as stocks or bonds.
              </ListItem>
              <ListItem>
                Halalanft should be understood as a digital art asset that can
                be enjoyed for its artistic value and also serves as proof that
                the owner will receive benefits/utilities, either in the form of
                special access or claimable bonuses.
              </ListItem>
              <ListItem>
                Halalanft team is not responsible for any losses incurred by NFT
                buyers or other Halalanft product users due to fluctuating
                market prices or due to hacker/exploit attacks.
              </ListItem>
            </OrderedList>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="facebook" mr={3} onClick={onClose}>
              Agree
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
