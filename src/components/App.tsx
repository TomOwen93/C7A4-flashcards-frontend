import { UserLogin } from "./UserLogin";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../utils/types";
import { FlashCardApp } from "./FlashCardApp";
import { useImmer } from "use-immer";
import { Container, Divider, Heading, VStack } from "@chakra-ui/react";
import { baseUrl } from "../utils/baseUrl";

function App() {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [userList, setUserlist] = useImmer<User[]>([]);

    const fetchUsers = async () => {
        const users = await axios.get(`${baseUrl}/users`);
        console.log(users);
        setUserlist(users.data);
    };

    const updateUser = async (selectedUser: User) => {
        console.log(selectedUser);
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
                <VStack>
                    <Heading textAlign={"center"}>FlashCards</Heading>
                    <UserLogin
                        userList={userList}
                        updateUser={updateUser}
                        user={user}
                        addUser={addUser}
                    />
                    <Divider />
                    {user && <FlashCardApp user={user} />}
                </VStack>
            </Container>
        </div>
    );
}

export default App;
