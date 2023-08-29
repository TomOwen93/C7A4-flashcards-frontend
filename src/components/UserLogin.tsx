import { Select } from "@chakra-ui/react";
import { User } from "../utils/types";

interface UserLoginProps {
    userList: User[];
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

export function UserLogin({ userList, setUser }: UserLoginProps): JSX.Element {
    const handleSelectUser = (username: string) => {
        const matchingUser = userList.find(
            (user) => user.username === username
        );

        if (matchingUser) {
            setUser(matchingUser);
        }
    };

    return (
        <>
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
        </>
    );
}
