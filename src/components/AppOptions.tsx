import { Text } from "@chakra-ui/react";
import { Deck, User } from "../utils/types";
import CreateDeck from "./CreateDeck";

interface AppOptionsProps {
    chosenDeck?: Deck;
    user: User;
    addDeck: (deck: Deck) => void;
}

export default function AppOptions({
    chosenDeck,
    user,
    addDeck,
}: AppOptionsProps): JSX.Element {
    return (
        <>
            <CreateDeck user={user} addDeck={addDeck} />
            {chosenDeck ? (
                <>
                    {/* <EditDeck deck={chosenDeck} />
                    <DeleteDeck deck={chosenDeck} />
                    <AddCard deck={chosenDeck} /> */}
                </>
            ) : (
                <Text fontSize="lg">You need to add or select a deck!</Text>
            )}
        </>
    );
}
