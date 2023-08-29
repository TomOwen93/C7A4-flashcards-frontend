export interface User {
    username: string;
    userid: number;
}

export interface Deck {
    deckid: number;
    userid: number;
    name: string;
}

export interface Card {
    cardid: number;
    deckid: number;
    front: string;
    back: string;
}
