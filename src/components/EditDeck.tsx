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
import { Action } from "../utils/reducer";

interface EditDeckProps {
    chosenDeck: Deck;
    dispatch: React.Dispatch<Action>;
}

export default function EditDeck({
    chosenDeck,

    dispatch,
}: EditDeckProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inputValue, setInputValue] = useState<string>("Enter name");

    const handleEditDeck = async (newName: string) => {
        await axios.patch(`${baseUrl}/decks/${chosenDeck.deckid}`, {
            name: newName,
        });
        dispatch({
            type: "edit-deck-name",
            payload: { deck: chosenDeck, name: newName },
        });

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
