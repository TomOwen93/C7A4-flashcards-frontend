import { Text } from "@chakra-ui/react";
import { Deck, User } from "../utils/types";
import CreateDeck from "./CreateDeck";
import DeleteDeck from "./DeleteDeck";
import AddCard from "./AddCard";

interface AppOptionsProps {
    chosenDeck?: Deck;
    user: User;
    addDeck: (deck: Deck) => void;
    removeDeck: (deck: Deck) => void;
}

export default function AppOptions({
    chosenDeck,
    user,
    addDeck,
    removeDeck,
}: AppOptionsProps): JSX.Element {
    return (
        <>
            <CreateDeck user={user} addDeck={addDeck} />
            {chosenDeck ? (
                <>
                    <DeleteDeck
                        chosenDeck={chosenDeck}
                        removeDeck={removeDeck}
                    />

                    <AddCard chosenDeck={chosenDeck} />
                </>
            ) : (
                <Text fontSize="lg">You need to add or select a deck!</Text>
            )}
        </>
    );
}
