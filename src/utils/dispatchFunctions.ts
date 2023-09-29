import { AppState } from "./reducer";
import { fetchCards, fetchDecks } from "./serverUtils";
import { Card, Deck, User } from "./types";

export function chooseDeck(state: AppState, deckid: number): AppState {
    const newDeck = state.decks.find((deck) => deck.deckid === deckid);
    if (newDeck) {
        return { ...state, chosenDeck: newDeck };
    } else {
        return state;
    }
}

export async function handleFetchAll(
    user: User,
    currentDeck?: Deck
): Promise<AppState> {
    const fetchedDecks = await fetchDecks(user);

    let chosenDeck;
    if (!currentDeck) {
        chosenDeck = fetchedDecks[0];
    } else {
        chosenDeck = currentDeck;
    }

    const fetchedCards: Card[] = await fetchCards(chosenDeck);

    const newState: AppState = {
        decks: fetchedDecks,
        chosenDeck: chosenDeck,
        cards: fetchedCards,
    };
    return newState;
}

export function addDeck(state: AppState, newDeck: Deck) {
    return { ...state, decks: [...state.decks, newDeck] };
}

export function removeDeck(state: AppState, deckToRemove: Deck) {
    const filteredDecks = state.decks.filter(
        (d) => d.deckid !== deckToRemove.deckid
    );
    return { ...state, decks: filteredDecks };
}

export function addCardToDeck(state: AppState, newCard: Card) {
    return { ...state, cards: [...state.cards, newCard] };
}

export function editDeckName(state: AppState, deck: Deck, newName: string) {
    const updateDeckNames = state.decks.map((d) =>
        d.deckid === deck.deckid ? { ...d, name: newName } : d
    );
    return { ...state, decks: updateDeckNames };
}

export function removeCard(state: AppState, card: Card) {
    const filteredCards = state.cards.filter((c) => c.cardid !== card.cardid);
    return { ...state, cards: filteredCards };
}
