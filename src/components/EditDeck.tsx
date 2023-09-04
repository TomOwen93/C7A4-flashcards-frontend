import {
    Button,
    Input,
    MenuGroup,
    MenuItem,
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
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

interface EditDeckProps {
    chosenDeck: Deck;
    editDeckName: (deck: Deck, name: string) => void;
}

export default function EditDeck({
    chosenDeck,
    editDeckName,
}: EditDeckProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inputValue, setInputValue] = useState<string>("Enter name");

    const handleEditDeck = async (newName: string) => {
        await axios.patch(`${baseUrl}/decks/${chosenDeck.deckid}`, {
            name: newName,
        });
        editDeckName(chosenDeck, newName);
        onClose();
    };

    return (
        <MenuGroup>
            <Button onClick={onOpen}>Edit deck</Button>
            <MenuItem>
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{`Edit Deck: ${chosenDeck.name}`}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                placeholder="Enter new name:"
                                onChange={(e) => setInputValue(e.target.value)}
                            ></Input>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={() => handleEditDeck(inputValue)}
                            >
                                Submit
                            </Button>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </MenuItem>
        </MenuGroup>
    );
}
