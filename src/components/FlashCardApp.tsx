import { HStack, Select, Stack, VStack } from "@chakra-ui/react";
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
    console.log(user);

    const [chosenDeck, setChosenDeck] = useState<Deck>();
    const [decks, setDecks] = useImmer<Deck[]>([]);
    const [_cardList, setCardList] = useImmer<Card[]>([]);

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

    const fetchCards = async () => {
        const userCards = await axios
            .get(`${baseUrl}/cards/${chosenDeck?.deckid}`)
            .then((response) => response.data);
        setCardList(userCards);
    };

    useEffect(() => {
        fetchDecks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchDecks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        fetchCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chosenDeck]);

    const addDeck = (deck: Deck) => {
        setDecks((draft) => {
            draft.push(deck);
        });
    };

    const removeDeck = (deck: Deck) => {
        setDecks((draft) => {
            draft.filter((d) => d.deckid !== deck.deckid);
        });
    };

    return (
        <div>
            <HStack>
                <VStack>
                    <AppOptions
                        chosenDeck={chosenDeck}
                        user={user}
                        addDeck={addDeck}
                        removeDeck={removeDeck}
                    />

                    <Stack>
                        <Select
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

                    <div className="flashcard-container">
                        <Flashcard />
                    </div>
                </VStack>
            </HStack>
        </div>
    );
}
