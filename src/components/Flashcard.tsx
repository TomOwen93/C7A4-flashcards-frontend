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
} from "@chakra-ui/react";

interface FlashcardState {
    currentCardIndex: number; // index in the array of the current card
    prevCardIndex: number; // the index of the previous card
    practicing: boolean; // whether you are viewing the deck or practicing
    shuffle: boolean; // whether you progress in order or randomly through the cards
    frontSide: boolean; //whether its showing the front of the card or not
}

interface FlashcardProps {
    cards: Card[];
}

export function Flashcard({ cards }: FlashcardProps): JSX.Element {
    const initialState = {
        currentCardIndex: 0,
        prevCardIndex: 0,
        practicing: true,
        shuffle: false,
        frontSide: true,
    };

    const [flashcardState, setFlashcardState] =
        useImmer<FlashcardState>(initialState);

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

    const currentCard = cards[flashcardState.currentCardIndex];

    return (
        <>
            {cards.length !== 0 && (
                <VStack>
                    <ChakraCard>
                        <CardBody>
                            <Center h={"200px"}>
                                <Heading size="md">
                                    {flashcardState.frontSide
                                        ? currentCard.front
                                        : currentCard.back}
                                </Heading>
                            </Center>
                            <HStack>
                                <ButtonGroup>
                                    <Button onClick={() => handleFlipCard()}>
                                        flip card
                                    </Button>
                                    <Button onClick={() => handleNextCard()}>
                                        next card
                                    </Button>
                                    <Button onClick={() => handlePrevCard()}>
                                        previous card
                                    </Button>
                                </ButtonGroup>
                            </HStack>
                        </CardBody>
                    </ChakraCard>
                </VStack>
            )}
        </>
    );
}
