export abstract class Gamer {
  /**
   * Bool flag indicates if the player score exceeds 21
   */
  public hasBusted: boolean = false;
  /**
   * The current cards the player has
   */
  protected _hand: string[] = [];
  /**
   * The current cards the player has
   */
  public get hand(): string[] {
    return this._hand;
  }

  public status: string;
  /**
   * The sum of the value of the player's hand
   */
  protected _score: number = 0;
  /**
   * The sum of the value of the player's hand
   */
  public get score(): number {
    return this._score;
  }

  /**
   * Adds cards provided to player's {@link Gamer._hand}
   * @param cards
   */
  public updateHand(cards: string[]): void {
    this._hand.push(...cards);
    this.updateScore();
  }

  public reset(): void {
    this._hand = [];
    this._score = 0;
  }

  /**
   * Displays the name, showing cards, and score for the player
   * @param gamer
   */
  protected printStatus(gamer: string): void {
    this.status = `${gamer} is showing ${this._hand.join(', ')}`;
    this.status += (this.hasBusted ? ' and has busted with ' : ' for ') + `${this._score}`;
  }

  /**
   * Determines if the players cards add up to exactly 21. 
   */
  public hasBlackJack(): boolean {
    this.updateScore();
    if (this._score === 21)
      return true;
    else
      return false;
  }

  /**
   * Updates the player score with the new sum of the value of the player's hand
   */
  public updateScore(): void {
    let aceCount: number = 0;
    this._score =
      this._hand.reduce((tempScore: number, card: string) => {
        const cardValue: number = parseInt(card);
        // If the card parses, simply add it
        if (!isNaN(cardValue))
          return tempScore + cardValue;
        // If the card does not parse, but isn't an Ace, add 10
        else if (card != 'A')
          return tempScore + 10;
        // If this is our first Ace and the score is less than 11, add 11
        else if (aceCount === 0 && tempScore < 11) {
          aceCount++;
          return tempScore + 11;
        }
        // Otherwise, add 1 for every Ace 
        else
          return tempScore + 1;
      }, 0);

    this.hasBusted = this._score > 21;
  }
}
