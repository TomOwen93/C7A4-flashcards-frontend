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
import { Card, Deck, User } from "../utils/types";
import { Flashcard } from "./Flashcard";
import { useEffect, useState } from "react";
import axios from "axios";
import AppOptions from "./AppOptions";
import { useImmer } from "use-immer";
import { baseUrl } from "../utils/baseUrl";

interface FlashCardAppProps {
    user: User;
}

export function FlashCardApp({ user }: FlashCardAppProps): JSX.Element {
    const [chosenDeck, setChosenDeck] = useState<Deck>();
    const [decks, setDecks] = useImmer<Deck[]>([]);
    const [chosenDecksCards, setChosenDecksCards] = useImmer<Card[]>([]);

    const handleChooseDeck = (deckid: number) => {
        const newDeck = decks.find((deck) => deck.deckid === deckid);
        setChosenDeck(newDeck);
    };

    const fetchDecks = async () => {
        const userDecks = await axios
            .get<Deck[]>(`${baseUrl}/decks/${user.userid}`)
            .then((response) => response.data);
        setDecks(userDecks);
    };

    useEffect(() => {
        fetchDecks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchDecks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const fetchCards = async () => {
        if (chosenDeck) {
            const userCards = await axios
                .get(`${baseUrl}/cards/${chosenDeck.deckid}`)
                .then((response) => response.data);
            setChosenDecksCards(userCards);
        }
    };

    useEffect(() => {
        fetchCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chosenDeck]);

    const addDeck = (deck: Deck) => {
        setDecks((draft) => {
            draft.push(deck);
        });
        setChosenDeck(deck);
    };

    const removeDeck = (deck: Deck) => {
        setDecks((draft) => {
            return draft.filter((d) => d.deckid !== deck.deckid);
        });
        setChosenDeck(undefined);
    };

    const addCardtoDeck = (card: Card) => {
        setChosenDecksCards((draft) => {
            draft.push(card);
        });
    };

    const editDeckName = (deck: Deck, newName: string) => {
        setDecks((prev) => {
            return prev.map((d) =>
                d.deckid === deck.deckid ? { ...d, name: newName } : deck
            );
        });
    };

    function handleDeletedCard(card: Card) {
        setChosenDecksCards((draft) =>
            draft.filter((c) => c.cardid !== card.cardid)
        );
    }

    return (
        <div>
            <VStack>
                {chosenDecksCards.length > 0 ? (
                    <div className="flashcard-container">
                        {chosenDeck && (
                            <Flashcard
                                cards={chosenDecksCards}
                                handleDeletedCard={handleDeletedCard}
                                user={user}
                                chosenDeck={chosenDeck}
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
                        chosenDeck={chosenDeck}
                        user={user}
                        addDeck={addDeck}
                        removeDeck={removeDeck}
                        addCardtoDeck={addCardtoDeck}
                        editDeckName={editDeckName}
                        chosenDecksCards={chosenDecksCards}
                    />

                    <Stack>
                        <Text textAlign={"center"} as="b" fontSize="md">
                            Current Deck:
                        </Text>
                        <Select
                            textAlign={"center"}
                            value={chosenDeck?.deckid}
                            onChange={(e) =>
                                handleChooseDeck(parseInt(e.target.value))
                            }
                        >
                            <option value={""}></option>
                            {decks.map((deck, index) => (
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
