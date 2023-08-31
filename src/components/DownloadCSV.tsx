import {
    Button,
    HStack,
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
import { Card } from "../utils/types";
import { CSVLink } from "react-csv";
import { useState } from "react";

interface DownloadCSVProps {
    cards: Card[];
}

export default function DownloadCSV({ cards }: DownloadCSVProps) {
    const [fileName, setFileName] = useState<string>("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const headers = [
        { label: "Card Id", key: "cardid" },
        { label: "Front Text", key: "front" },
        { label: "Back Text", key: "back" },
        { label: "Deck Id", key: "deckid" },
    ];

    const data = cards.map((c) => ({
        cardid: c.cardid,
        front: c.front,
        back: c.back,
        deckid: c.deckid,
    }));

    console.log(data);
    return (
        <>
            <Button onClick={onOpen}>Download as CSV</Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Edit csv file name before download:
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            value={fileName}
                            placeholder="Enter file name"
                            onChange={(e) => setFileName(e.target.value)}
                        ></Input>
                    </ModalBody>

                    <ModalFooter>
                        <HStack>
                            <Button>
                                <CSVLink
                                    data={data}
                                    headers={headers}
                                    filename={fileName}
                                >
                                    Download CSV
                                </CSVLink>
                            </Button>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
