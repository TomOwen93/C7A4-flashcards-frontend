import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    HStack,
} from "@chakra-ui/react";
import { Card, Deck, User } from "../utils/types";
import CreateDeck from "./CreateDeck";
import DeleteDeck from "./DeleteDeck";
import AddCard from "./AddCard";

interface AppOptionsProps {
    chosenDeck?: Deck;
    user: User;
    addDeck: (deck: Deck) => void;
    removeDeck: (deck: Deck) => void;
    addCardtoDeck: (card: Card) => void;
}

export default function AppOptions({
    chosenDeck,
    user,
    addDeck,
    removeDeck,
    addCardtoDeck,
}: AppOptionsProps): JSX.Element {
    return (
        <>
            {chosenDeck ? (
                <HStack>
                    <DeleteDeck
                        chosenDeck={chosenDeck}
                        removeDeck={removeDeck}
                    />

                    <AddCard
                        chosenDeck={chosenDeck}
                        addCardtoDeck={addCardtoDeck}
                    />
                </HStack>
            ) : (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>No Deck Selected</AlertTitle>
                    <AlertDescription>
                        You need to add or select a deck!
                    </AlertDescription>
                </Alert>
            )}
            <CreateDeck user={user} addDeck={addDeck} />
        </>
    );
}
