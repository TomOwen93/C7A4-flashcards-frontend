import { UserLogin } from "./UserLogin";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Deck, User } from "../utils/types";
import { FlashCardApp } from "./FlashCardApp";

function App() {
    const [user, setUser] = useState<User>(/*{ username: "Tom", id: 1 }*/);
    const [userList, setUserlist] = useState<User[]>([]);
    const [decks, setDecks] = useState<Deck[]>([]);

    const fetchUsers = async () => {
        const users = await axios.get("http://localhost:4000/users");
        console.log(users);
        setUserlist(users.data);
    };

    const updateUser = async (selectedUser: User) => {
        console.log(selectedUser);
        const userDecks = await axios
            .get<Deck[]>(`http://localhost:4000/decks/${selectedUser.userid}`)
            .then((response) => response.data);
        setUser(selectedUser);
        setDecks(userDecks);
        console.log(decks);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="App">
            <UserLogin
                userList={userList}
                updateUser={updateUser}
                user={user}
            />
            {user && <FlashCardApp user={user} decks={decks} />}
        </div>
    );
}

export default App;
