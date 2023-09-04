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
import { Action } from "../utils/reducer";

interface AppOptionsProps {
    chosenDeck?: Deck;
    user: User;
    dispatch: React.Dispatch<Action>;
    chosenDecksCards?: Card[];
}

export default function AppOptions({
    chosenDeck,
    user,
    dispatch,
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
                                    dispatch={dispatch}
                                />
                                <EditDeck
                                    chosenDeck={chosenDeck}
                                    dispatch={dispatch}
                                />
                                {chosenDecksCards !== undefined && (
                                    <DownloadCSV cards={chosenDecksCards} />
                                )}
                            </MenuList>
                        </Menu>
                        <AddCard chosenDeck={chosenDeck} dispatch={dispatch} />
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
            <CreateDeck user={user} dispatch={dispatch} />
            <ImportCSV user={user} dispatch={dispatch} />
        </>
    );
}
