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
} from "@chakra-ui/react";

import { useState } from "react";
import axios from "axios";

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

    const handleSelectUser = (username: string) => {
        const matchingUser = userList.find(
            (user) => user.username === username
        );

        if (matchingUser) {
            updateUser(matchingUser);
        }
    };

    const handleSubmitUser = async () => {
        const response = await axios.post<User>(
            "http://localhost:4000/users/",
            {
                username: inputValue,
            }
        );

        addUser(response.data);
        onClose();
    };

    return (
        <>
            <VStack>
                <Select
                    placeholder="Select User"
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
