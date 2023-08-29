import { Select, Stack, VStack } from "@chakra-ui/react";
import { Deck, User } from "../utils/types";
import { Flashcard } from "./Flashcard";
import { useEffect, useState } from "react";
import axios from "axios";
import AppOptions from "./AppOptions";
import { useImmer } from "use-immer";

interface FlashCardAppProps {
    user: User;
}

export function FlashCardApp({ user }: FlashCardAppProps): JSX.Element {
    console.log(user);

    const [chosenDeck, setChosenDeck] = useState<Deck>();
    const [decks, setDecks] = useImmer<Deck[]>([]);

    const handleChooseDeck = (deckid: number) => {
        const newDeck = decks.find((deck) => deck.deckid === deckid);
        setChosenDeck(newDeck);
    };

    const fetchDecks = async () => {
        const userDecks = await axios
            .get<Deck[]>(`http://localhost:4000/decks/${user.userid}`)
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

    const addDeck = (deck: Deck) => {
        setDecks((draft) => {
            draft.push(deck);
        });
    };

    return (
        <div>
            <VStack>
                <AppOptions
                    chosenDeck={chosenDeck}
                    user={user}
                    addDeck={addDeck}
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
        </div>
    );
}
