import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { Card, Deck } from "../utils/types";
import { useImmer } from "use-immer";
import { useEffect } from "react";
import {
    Card as ChakraCard,
    CardBody,
    Text,
    VStack,
    Button,
    HStack,
} from "@chakra-ui/react";

interface FlashcardState {
    currentCardIndex: number; // index in the array of the current card
    cards: Card[]; // array of cards in the current deck
    deckid: number; //id of the currently selected deck
    prevCardIndex: number; // the index of the previous card
    practicing: boolean; // whether you are viewing the deck or practicing
    shuffle: boolean; // whether you progress in order or randomly through the cards
    frontSide: boolean; //whether its showing the front of the card or not
}

interface FlashcardProps {
    deck: Deck;
}

export function Flashcard({ deck }: FlashcardProps): JSX.Element {
    const cards: Card[] = [];
    const initialState = {
        currentCardIndex: 0,
        cards: cards,
        deckid: deck.deckid,
        prevCardIndex: 0,
        practicing: true,
        shuffle: false,
        frontSide: true,
    };

    const [flashcardState, setFlashcardState] =
        useImmer<FlashcardState>(initialState);

    const fetchCards = async () => {
        // const userCards = await axios
        //     .get(`${baseUrl}/cards/1`)
        //     .then((response) => response.data);
        const userCards = await axios
            .get(`${baseUrl}/cards/${deck.deckid}`)
            .then((response) => response.data);
        setFlashcardState(draft => {draft.cards = userCards})
    };
    useEffect(() => {
        fetchCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deck]);

    useEffect(() => {
        fetchCards()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleNextCard() {
        if (flashcardState.shuffle) {
            const nextCardIndex = Math.floor(
                Math.random() * (flashcardState.cards.length - 1)
            );
            setFlashcardState((draft) => {
                draft.prevCardIndex = draft.currentCardIndex;
                draft.currentCardIndex = nextCardIndex;
                draft.frontSide = true;
            });
        } else {
            setFlashcardState((draft) => {
                draft.prevCardIndex = draft.currentCardIndex;
                draft.currentCardIndex++;
                draft.frontSide = true;
            });
        }
    }
    function handlePrevCard() {
        setFlashcardState(
            (draft) => {
                draft.currentCardIndex = draft.prevCardIndex
                draft.frontSide = true;
            }
        );
    }

    function handleFlipCard() {
        setFlashcardState((draft) => {draft.frontSide = !draft.frontSide});
    }

    const currentCard = flashcardState.cards[flashcardState.currentCardIndex];

    return (
        <>
            {flashcardState.cards.length !== 0 && (
                <VStack>
                    <ChakraCard>
                        <CardBody>
                            <Text>
                                {flashcardState.frontSide
                                    ? currentCard.front
                                    : currentCard.back}
                            </Text>
                            <HStack>
                                <Button onClick={() => handleFlipCard()}>
                                    flip card
                                </Button>
                                <Button onClick={() => handleNextCard()}>
                                    next card
                                </Button>
                                <Button onClick={() => handlePrevCard()}>
                                    previous card
                                </Button>
                            </HStack>
                        </CardBody>
                    </ChakraCard>
                </VStack>
            )}
        </>
    );
}
