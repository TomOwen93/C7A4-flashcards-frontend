import { UserLogin } from "./UserLogin";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../utils/types";

function App() {
    const [user, setUser] = useState<User>({ username: "Tom", id: 1 });
    const [userList, setUserlist] = useState<User[]>([]);

    const fetchUsers = async () => {
        const users = await axios.get("http://localhost:4000/users");
        console.log(users);
        setUserlist(users.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    console.log(user);

    return (
        <div className="App">
            <UserLogin userList={userList} setUser={setUser} />
        </div>
    );
}

export default App;
