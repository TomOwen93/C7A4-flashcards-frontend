import {
    Button,
    Center,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import Papa from "papaparse";
import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../utils/baseUrl";
import { Deck, User } from "../utils/types";

interface ImportCSVProps {
    user: User;
    addDeck: (deck: Deck) => void;
}

interface CSVData {
    front: string;
    back: string;
    deckid: string;
}

export default function ImportCSV({ user, addDeck }: ImportCSVProps) {
    const [file, setFile] = useState<File>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [csvData, setCsvData] = useState<CSVData[]>();

    const [importedDeckName, setImportedDeckName] = useState<string>("");

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        if (file) {
            Papa.parse(file, {
                complete: (res) => {
                    const filteredOutput: any = res.data.filter(
                        (_row, index) => index !== 0
                    );

                    setCsvData(
                        filteredOutput.map(({ row }: any) => ({
                            front: row[1],
                            back: row[2],
                            deckid: row[3],
                        }))
                    );
                },
            });
            console.log(csvData);
            onOpen();
        }
    };

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
        if (name !== "" && name !== null) {
            const response: AxiosResponse = await axios.post(
                `${baseUrl}/decks`,
                {
                    name,
                    userid: user.userid,
                }
            );

            successToast(`Successfully submitted deck:
             "${name}"`);
            addDeck(response.data);
            handleSubmitCards(response.data.deckid);
        } else {
            failToast("Your deck name must not be blank or null!");
        }

        setImportedDeckName("");
        onClose();
    };

    const handleSubmitCards = async (deckid: string) => {
        if (csvData) {
            for (const card of csvData) {
                await axios.post(`${baseUrl}/cards`, {
                    deckid: deckid,
                    front: card.front,
                    back: card.back,
                });
            }
        }
    };

    return (
        <>
            <div style={{ textAlign: "center" }}>
                <Center>
                    <form>
                        <input
                            type={"file"}
                            id={"csvFileInput"}
                            accept={".csv"}
                            onChange={(e) => handleOnChange(e)}
                        />
                        <VStack>
                            <Button onClick={(e) => handleSubmit(e)}>
                                Import deck from CSV
                            </Button>
                        </VStack>
                    </form>
                </Center>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Please give your deck a name:</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            value={importedDeckName}
                            placeholder="Enter name"
                            onChange={(e) =>
                                setImportedDeckName(e.target.value)
                            }
                        ></Input>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => handleSubmitDeck(importedDeckName)}
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
