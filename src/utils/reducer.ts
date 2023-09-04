import {
    addCardToDeck,
    addDeck,
    chooseDeck,
    editDeckName,
    removeCard,
    removeDeck,
} from "./dispatchFunctions";
import { Card, Deck } from "./types";

export type Action =
    | ChooseDeckAction
    | FetchDataAction
    | DeleteCardAction
    | DeleteDeckAction
    | AddDeckAction
    | EditDeckNameAction
    | AddCardAction;

interface AddDeckAction {
    type: "add-deck";
    payload: Deck;
}

interface DeleteCardAction {
    type: "delete-card";
    payload: Card;
}

interface AddCardAction {
    type: "add-card";
    payload: Card;
}

interface DeleteDeckAction {
    type: "delete-deck";
    payload: Deck;
}

interface ChooseDeckAction {
    type: "choose-deck";
    payload: number;
}

interface EditDeckNameAction {
    type: "edit-deck-name";
    payload: { deck: Deck; name: string };
}

interface FetchDataAction {
    type: "store-fetched-data";
    payload: AppState;
}

export interface AppState {
    decks: Deck[];
    chosenDeck: Deck;
    cards: Card[];
}

export function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case "add-deck":
            return addDeck(state, action.payload);
        case "edit-deck-name":
            return editDeckName(
                state,
                action.payload.deck,
                action.payload.name
            );
        case "choose-deck":
            return chooseDeck(state, action.payload);
        case "delete-deck":
            return removeDeck(state, action.payload);
        case "store-fetched-data":
            return action.payload;
        case "add-card":
            return addCardToDeck(state, action.payload);
        case "delete-card":
            return removeCard(state, action.payload);
    }
}
