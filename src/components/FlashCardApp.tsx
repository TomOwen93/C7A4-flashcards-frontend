import { Select } from "@chakra-ui/react";
import { Deck, User } from "../utils/types";
import { Flashcard } from "./Flashcard";

interface FlashCardAppProps {
    user: User;
    decks: Deck[];
}

export function FlashCardApp({ user, decks }: FlashCardAppProps): JSX.Element {
    console.log(user, decks);

    return (
        <div>
            <Select></Select>
            <div className="flashcard-container">
                <Flashcard />
            </div>
        </div>
    );
}
