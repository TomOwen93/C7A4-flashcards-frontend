import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Select,
    Stack,
    VStack,
    Text,
} from "@chakra-ui/react";
import { User } from "../utils/types";
import { Flashcard } from "./Flashcard";
import { useEffect, useReducer } from "react";
import AppOptions from "./AppOptions";

import { AppState, reducer } from "../utils/reducer";
import { handleFetchAll } from "../utils/dispatchFunctions";

interface FlashCardAppProps {
    user: User;
}

export function FlashCardApp({ user }: FlashCardAppProps): JSX.Element {
    const initialState: AppState = {
        decks: [],
        chosenDeck: {
            deckid: -1,
            userid: -1,
            name: "",
        },
        cards: [],
    };

    const [AppState, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        handleFetchAll(user).then((result) =>
            dispatch({ type: "store-fetched-data", payload: result })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleFetchAll(user).then((result) =>
            dispatch({ type: "store-fetched-data", payload: result })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <div>
            <VStack>
                {AppState.cards.length > 0 ? (
                    <div className="flashcard-container">
                        {AppState.chosenDeck && (
                            <Flashcard
                                cards={AppState.cards}
                                dispatch={dispatch}
                                user={user}
                                chosenDeck={AppState.chosenDeck}
                            />
                        )}
                    </div>
                ) : (
                    <Alert status="error">
                        <AlertIcon />
                        <AlertTitle>Cards needed</AlertTitle>
                        <AlertDescription>
                            You need to add a card to your deck!
                        </AlertDescription>
                    </Alert>
                )}

                <VStack>
                    <AppOptions
                        chosenDeck={AppState.chosenDeck}
                        user={user}
                        dispatch={dispatch}
                        chosenDecksCards={AppState.cards}
                    />

                    <Stack>
                        <Text textAlign={"center"} as="b" fontSize="md">
                            Current Deck:
                        </Text>
                        <Select
                            textAlign={"center"}
                            value={AppState.chosenDeck?.deckid}
                            onChange={(e) =>
                                dispatch({
                                    type: "choose-deck",
                                    payload: parseInt(e.target.value),
                                })
                            }
                        >
                            <option value={""}></option>
                            {AppState.decks.map((deck, index) => (
                                <option value={deck.deckid} key={index}>
                                    {deck.name}
                                </option>
                            ))}
                        </Select>
                    </Stack>
                </VStack>
            </VStack>
        </div>
    );
}
