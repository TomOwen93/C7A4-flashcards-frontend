import { User } from "../utils/types";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    useDisclosure,
    Select,
    VStack,
    useToast,
} from "@chakra-ui/react";

import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

interface UserLoginProps {
    userList: User[];
    updateUser(user: User): Promise<void>;
    user: User | undefined;
    addUser: (user: User) => void;
}

export function UserLogin({
    userList,
    updateUser,
    user,
    addUser,
}: UserLoginProps): JSX.Element {
    const [inputValue, setInputValue] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedUserValue, setSelectedUserValue] = useState("");

    const handleSelectUser = (username: string) => {
        const matchingUser = userList.find(
            (user) => user.username === username
        );

        if (matchingUser) {
            updateUser(matchingUser);
            setSelectedUserValue(username);
        }
    };

    const handleSubmitUser = async () => {
        if (inputValue === "" || inputValue === null) {
            failToast(`Your username must not be blank or null`);
        } else {
            const response = await axios.post<User>(`${baseUrl}/users/`, {
                username: inputValue,
            });
            successToast(`New user ${inputValue} added`);
            addUser(response.data);
            updateUser(response.data);
            setSelectedUserValue(inputValue);
        }
        onClose();
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

    return (
        <>
            <VStack>
                <Select
                    placeholder="Select User"
                    value={selectedUserValue}
                    onChange={(e) => handleSelectUser(e.target.value)}
                >
                    {userList.map((user) => (
                        <option value={user.username} key={user.username}>
                            {user.username}
                        </option>
                    ))}
                </Select>
                <h1>{user && `Currently logged in as: ${user.username}`}</h1>
                <Button onClick={onOpen}>Submit new user</Button>

                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Submit new user:</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                onChange={(e) => setInputValue(e.target.value)}
                            ></Input>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={handleSubmitUser}
                            >
                                Submit User
                            </Button>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </VStack>
        </>
    );
}
