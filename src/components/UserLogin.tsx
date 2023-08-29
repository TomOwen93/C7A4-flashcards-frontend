import { Select } from "@chakra-ui/react";
import { User } from "../utils/types";

interface UserLoginProps {
    userList: User[];
    updateUser(user: User): Promise<void>;
    user: User | undefined;
}

export function UserLogin({
    userList,
    updateUser,
    user,
}: UserLoginProps): JSX.Element {
    const handleSelectUser = (username: string) => {
        const matchingUser = userList.find(
            (user) => user.username === username
        );

        if (matchingUser) {
            updateUser(matchingUser);
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
            <h1>{user && user.username}</h1>
        </>
    );
}
