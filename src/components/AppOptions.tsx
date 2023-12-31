import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
    HStack,
    Menu,
    MenuButton,
    MenuList,
} from "@chakra-ui/react";
import { Card, Deck, User } from "../utils/types";
import CreateDeck from "./CreateDeck";
import DeleteDeck from "./DeleteDeck";
import AddCard from "./AddCard";
import EditDeck from "./EditDeck";
import DownloadCSV from "./DownloadCSV";
import ImportCSV from "./ImportCSV";

interface AppOptionsProps {
    chosenDeck?: Deck;
    user: User;
    addDeck: (deck: Deck) => void;
    removeDeck: (deck: Deck) => void;
    addCardtoDeck: (card: Card) => void;
    editDeckName: (deck: Deck, name: string) => void;
    chosenDecksCards?: Card[];
}

export default function AppOptions({
    chosenDeck,
    user,
    addDeck,
    removeDeck,
    addCardtoDeck,
    editDeckName,
    chosenDecksCards,
}: AppOptionsProps): JSX.Element {
    return (
        <>
            {chosenDeck && chosenDeck.userid === user.userid ? (
                <>
                    <HStack>
                        <Menu>
                            <MenuButton as={Button}>Deck options</MenuButton>
                            <MenuList>
                                <DeleteDeck
                                    chosenDeck={chosenDeck}
                                    removeDeck={removeDeck}
                                />

                                <EditDeck
                                    chosenDeck={chosenDeck}
                                    editDeckName={editDeckName}
                                />

                                {chosenDecksCards !== undefined && (
                                    <DownloadCSV cards={chosenDecksCards} />
                                )}
                            </MenuList>
                        </Menu>
                        <AddCard
                            chosenDeck={chosenDeck}
                            addCardtoDeck={addCardtoDeck}
                        />
                    </HStack>
                </>
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
            <ImportCSV user={user} addDeck={addDeck} />
        </>
    );
}
