import { Card } from "../utils/types";
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
    handleDeletedCard: (card: Card) => void;
}

export function Flashcard({
    cards,
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

    const [currentCard, setCurrentCard] = useImmer(
        cards[flashcardState.currentCardIndex]
    );

    function handleNextCard() {
        if (flashcardState.shuffle) {
            const nextCardIndex = Math.floor(
                Math.random() * (cards.length - 1)
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
        setFlashcardState((draft) => {
            draft.currentCardIndex = draft.prevCardIndex;
            draft.frontSide = true;
        });
    }

    function handleFlipCard() {
        setFlashcardState((draft) => {
            draft.frontSide = !draft.frontSide;
        });
    }

    function handleEditedCard(front: string, back: string) {
        setCurrentCard((draft) => {
            draft.front = front;
            draft.back = back;
        });
    }

    return (
        <>
            {cards.length !== 0 && (
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
                                            previous card
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
