import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { Deck } from "../utils/types";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

interface DeleteDeckProps {
    chosenDeck: Deck;
    removeDeck: (deck: Deck) => void;
}

export default function DeleteDeck({
    chosenDeck,
    removeDeck,
}: DeleteDeckProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteDeck = async () => {
        await axios.delete(`${baseUrl}/decks/${chosenDeck.deckid}`);
        removeDeck(chosenDeck);
        onClose();
    };

    console.log(`${baseUrl}/decks/${chosenDeck.deckid}`);

    return (
        <>
            <Button onClick={onOpen}>Delete Current Deck</Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {`Are you sure you want to delete the deck: ${chosenDeck.name}?`}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody></ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => handleDeleteDeck()}
                        >
                            Yes
                        </Button>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            No
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
