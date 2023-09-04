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
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { Action } from "../utils/reducer";

interface DeleteCardProps {
    currentCard: Card;
    dispatch: React.Dispatch<Action>;
    frontValue: string;
    backValue: string;
}

export default function DeleteCard({
    currentCard,
    dispatch,
    frontValue,
    backValue,
}: DeleteCardProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteCard = async () => {
        await axios.delete(`${baseUrl}/cards/${currentCard.cardid}`);
        dispatch({ type: "delete-card", payload: currentCard });
        onClose();
    };

    return (
        <>
            <Button onClick={onOpen}>Delete card</Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {`Are you sure you want to delete this card?`}:
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <Textarea isDisabled value={frontValue}></Textarea>
                            <Textarea isDisabled value={backValue}></Textarea>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => handleDeleteCard()}
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
