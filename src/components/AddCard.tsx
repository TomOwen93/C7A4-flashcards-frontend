import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { Deck } from "../utils/types";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

interface AddCardProps {
    chosenDeck: Deck;
}

export default function AddCard({ chosenDeck }: AddCardProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [frontInputValue, setFrontInputValue] = useState("");
    const [backInputValue, setBackInputValue] = useState("");

    const handleSubmitCard = async () => {
        await axios.post(`${baseUrl}/cards`, {
            deckid: chosenDeck.deckid,
            front: frontInputValue,
            back: backInputValue,
        });
        setFrontInputValue("");
        setBackInputValue("");
        onClose();
    };

    return (
        <>
            <Button onClick={onOpen}>Submit new card</Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Submit new card:</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <Textarea
                                placeholder="Enter front of card"
                                value={frontInputValue}
                                onChange={(e) =>
                                    setFrontInputValue(e.target.value)
                                }
                            ></Textarea>
                            <Textarea
                                placeholder="Enter back of card"
                                value={backInputValue}
                                onChange={(e) =>
                                    setBackInputValue(e.target.value)
                                }
                            ></Textarea>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => handleSubmitCard()}
                        >
                            Submit Card
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
