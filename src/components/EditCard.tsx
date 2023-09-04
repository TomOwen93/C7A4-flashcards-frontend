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
import { Card } from "../utils/types";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import DeleteCard from "./DeleteCard";
import { Action } from "../utils/reducer";

interface EditCardProps {
    currentCard: Card;
    handleEditedCard: (front: string, back: string) => void;
    dispatch: (action: Action) => void;
}

export default function EditCard({
    currentCard,
    dispatch,
    handleEditedCard,
}: EditCardProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [frontInputValue, setFrontInputValue] = useState("");
    const [backInputValue, setBackInputValue] = useState("");

    const handleEditCard = async () => {
        await axios.patch(`${baseUrl}/cards/${currentCard.cardid}`, {
            front: frontInputValue,
            back: backInputValue,
        });

        handleEditedCard(frontInputValue, backInputValue);
        setFrontInputValue("");
        setBackInputValue("");
        onClose();
    };

    return (
        <>
            <Button onClick={onOpen}>Edit card</Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{`Editing Current Card:`}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <Textarea
                                placeholder={currentCard.front}
                                value={frontInputValue}
                                onChange={(e) =>
                                    setFrontInputValue(e.target.value)
                                }
                            ></Textarea>
                            <Textarea
                                placeholder={currentCard.back}
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
                            onClick={() => handleEditCard()}
                        >
                            Submit edit
                        </Button>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <DeleteCard
                            currentCard={currentCard}
                            dispatch={dispatch}
                            frontValue={frontInputValue}
                            backValue={backInputValue}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
