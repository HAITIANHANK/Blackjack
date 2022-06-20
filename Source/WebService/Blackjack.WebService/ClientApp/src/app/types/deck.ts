export class Deck {

    /**
     * The collection of all cards that can possibly be drawn
     */
    public stack: string[] = [];

    constructor(deckQty: number = 1) {
        this.shuffle(deckQty);
    }

    /**
     * Populates the stack with as many decks as the player chooses.
     * @param deckQty
     */
    public shuffle(deckQty: number = 1): void {
        this.stack = [];
        const baseDeck: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const newDeck: string[] =
            new Array(deckQty)
                .fill(0)
                .flatMap(() => [...baseDeck, ...baseDeck, ...baseDeck, ...baseDeck]);
        this.stack.push(...newDeck);
        for (let i: number = this.stack.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.stack[i], this.stack[j]] = [this.stack[j], this.stack[i]];
        }
    }

    /**
     * Selects and removes cards from the stack to be given to the players.
     * @param draws
     */
    public deal(draws: number): string[] {
        return this.stack.splice(0, draws);
    }
}



