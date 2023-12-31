import { Card, Deck, User } from "../utils/types";
import { useImmer } from "use-immer";

import {
    Card as ChakraCard,
    CardBody,
    VStack,
    Button,
    HStack,
    Heading,
    Center,
    ButtonGroup,
    Box,
} from "@chakra-ui/react";
import EditCard from "./EditCard";

interface FlashcardState {
    currentCardIndex: number; // index in the array of the current card
    prevCardIndex: number; // the index of the previous card
    practicing: boolean; // whether you are viewing the deck or practicing
    shuffle: boolean; // whether you progress in order or randomly through the cards
    frontSide: boolean; //whether its showing the front of the card or not
}

interface FlashcardProps {
    cards: Card[];
    user: User;
    chosenDeck: Deck;
    handleDeletedCard: (card: Card) => void;
}

export function Flashcard({
    cards,
    user,
    chosenDeck,
    handleDeletedCard,
}: FlashcardProps): JSX.Element {
    const initialState = {
        currentCardIndex: 0,
        prevCardIndex: 0,
        practicing: true,
        shuffle: false,
        frontSide: true,
    };

    const [flashcardState, setFlashcardState] =
        useImmer<FlashcardState>(initialState);

    const [currentCard, setCurrentCard] = useImmer(cards[0]);

    function handleNextCard() {
        if (flashcardState.shuffle) {
            const nextCardIndex = Math.floor(Math.random() * cards.length);
            setFlashcardState((draft) => {
                draft.prevCardIndex = draft.currentCardIndex;
                draft.currentCardIndex = nextCardIndex;
                draft.frontSide = true;
            });
        } else {
            setFlashcardState((draft) => {
                draft.currentCardIndex++;
                draft.frontSide = true;
            });
        }

        setCurrentCard(cards[flashcardState.currentCardIndex + 1]);
    }
    function handlePrevCard() {
        setFlashcardState((draft) => {
            draft.currentCardIndex--;
            draft.frontSide = true;
        });
        setCurrentCard(cards[flashcardState.currentCardIndex - 1]);
    }

    function handleFlipCard() {
        setFlashcardState((draft) => {
            draft.frontSide = !draft.frontSide;
        });
    }

    function handleEditedCard(front: string, back: string) {
        if (front === "") {
            setCurrentCard((draft) => {
                draft.back = back;
            });
        } else {
            setCurrentCard((draft) => {
                draft.front = front;
            });
        }
    }

    return (
        <>
            {cards.length !== 0 && chosenDeck.userid === user.userid && (
                <VStack>
                    <ChakraCard>
                        <CardBody>
                            <Heading size="md">
                                {flashcardState.frontSide ? `Front` : `Back`}
                            </Heading>
                            <Center h={"200px"}>
                                <Heading size="md">
                                    <Box
                                        px="2"
                                        py="1"
                                        rounded="full"
                                        bg={
                                            flashcardState.frontSide
                                                ? "red.100"
                                                : "green.100"
                                        }
                                        color={
                                            flashcardState.frontSide
                                                ? "red"
                                                : "green"
                                        }
                                    >
                                        {flashcardState.frontSide
                                            ? currentCard.front
                                            : currentCard.back}
                                    </Box>
                                </Heading>
                            </Center>
                            <HStack>
                                <ButtonGroup>
                                    <Button onClick={() => handleFlipCard()}>
                                        Flip card
                                    </Button>
                                    <EditCard
                                        currentCard={currentCard}
                                        handleEditedCard={handleEditedCard}
                                        handleDeletedCard={handleDeletedCard}
                                    />
                                    {flashcardState.currentCardIndex <
                                        cards.length - 1 && (
                                        <>
                                            <Button
                                                onClick={() => handleNextCard()}
                                            >
                                                Next card
                                            </Button>
                                        </>
                                    )}

                                    {flashcardState.currentCardIndex > 0 && (
                                        <Button
                                            onClick={() => handlePrevCard()}
                                        >
                                            Previous card
                                        </Button>
                                    )}
                                </ButtonGroup>
                            </HStack>
                        </CardBody>
                    </ChakraCard>
                </VStack>
            )}
        </>
    );
}
