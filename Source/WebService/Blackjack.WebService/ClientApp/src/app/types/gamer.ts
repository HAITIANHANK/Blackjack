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

  /**
   * The current status of the player's hand and score
   */
  protected _status: string;
  /**
   * The current status of the player's hand and score
   */
  public get status(): string {
    return this._status;
  }
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
  protected setStatus(gamer: string): void {
    this._status = `${gamer} is showing ${this._hand.join(', ')}`
      + (this.hasBusted ? ' and has busted with ' : ' for ')
      + `${this._score}`;
  }

  /**
   * Determines if the players cards add up to exactly 21. 
   */
  public hasBlackJack(): boolean {
    this.updateScore();
    return this.score === 21;
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
    /* If our score is over 21 but an Ace was added as 11,
    then we need to retroactively change it's value to 1*/
    if (aceCount > 0 && this._score > 21)
      this._score -= 10;
    this.hasBusted = this._score > 21;
  }
}
