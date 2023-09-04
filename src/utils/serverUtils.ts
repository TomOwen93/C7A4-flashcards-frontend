import axios from "axios";
import { baseUrl } from "./baseUrl";
import { Deck, User } from "./types";

export async function fetchDecks(user: User) {
    return await axios
        .get<Deck[]>(`${baseUrl}/decks/${user.userid}`)
        .then((response) => response.data);
}

export async function fetchCards(chosenDeck: Deck) {
    if (chosenDeck) {
        return await axios
            .get(`${baseUrl}/cards/${chosenDeck.deckid}`)
            .then((response) => response.data);
    }
}
