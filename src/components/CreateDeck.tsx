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
    useToast,
} from "@chakra-ui/react";
import { Deck, User } from "../utils/types";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

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

    const toast = useToast();
    const successToast = (message: string) => {
        toast({
            title: "Success",
            description: message,
            status: "success",
            duration: 4000, // Duration in milliseconds
            isClosable: true,
        });
    };

    const failToast = (message: string) => {
        toast({
            title: "Error",
            description: message,
            status: "error",
            duration: 4000, // Duration in milliseconds
            isClosable: true,
        });
    };

    const handleSubmitDeck = async (name: string) => {
        console.log(name, name !== "", name !== null);
        if (name !== "" && name !== null) {
            const response = await axios.post(`${baseUrl}/decks`, {
                name,
                userid: user.userid,
            });
            successToast(`Successfully submitted deck:
             "${name}"`);
            addDeck(response.data);
        } else {
            failToast("Your deck name must not be blank or null!");
        }

        setInputValue("");
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
                            value={inputValue}
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
