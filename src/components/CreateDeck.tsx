import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { Deck, User } from "../utils/types";
import { useState } from "react";
import axios from "axios";

interface CreateDeckProps {
    user: User;
    addDeck: (deck: Deck) => void;
}

export default function CreateDeck({
    user,
    addDeck,
}: CreateDeckProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inputValue, setInputValue] = useState<string>("Enter name");

    const handleSubmitDeck = async (name: string) => {
        const response = await axios.post("http://localhost:4000/decks", {
            name,
            userid: user.userid,
        });

        addDeck(response.data);
        onClose();
    };

    return (
        <>
            <Button onClick={onOpen}>Submit new deck</Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Submit new Deck:</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Enter name"
                            onChange={(e) => setInputValue(e.target.value)}
                        ></Input>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => handleSubmitDeck(inputValue)}
                        >
                            Submit Deck
                        </Button>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
