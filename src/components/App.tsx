import { UserLogin } from "./UserLogin";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../utils/types";
import { FlashCardApp } from "./FlashCardApp";
import { useImmer } from "use-immer";
import {
    Button,
    Container,
    Divider,
    Heading,
    VStack,
    useColorMode,
} from "@chakra-ui/react";
import { baseUrl } from "../utils/baseUrl";
import { MoonIcon } from "@chakra-ui/icons";

function App() {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [userList, setUserlist] = useImmer<User[]>([]);
    const { colorMode, toggleColorMode } = useColorMode();

    const fetchUsers = async () => {
        const users = await axios.get(`${baseUrl}/users`);

        setUserlist(users.data);
    };

    const updateUser = async (selectedUser: User) => {
        setUser(selectedUser);
    };

    const addUser = (user: User) => {
        setUserlist((draft) => {
            draft.push(user);
        });
    };

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <Container>
                <Heading textAlign={"center"}>FlashCards</Heading>
            </Container>

            <Button onClick={toggleColorMode} leftIcon={<MoonIcon />}>
                Toggle {colorMode === "light" ? "Dark" : "Light"}
            </Button>

            <Container maxW={"800px"}>
                <VStack>
                    <VStack>
                        <UserLogin
                            userList={userList}
                            updateUser={updateUser}
                            user={user}
                            addUser={addUser}
                        />
                    </VStack>
                    <Divider orientation="horizontal" />
                    {user && <FlashCardApp user={user} />}
                </VStack>
            </Container>
        </div>
    );
}

export default App;
