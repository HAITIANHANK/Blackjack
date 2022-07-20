import { Gamer } from "./gamer";

export class Player extends Gamer {
  /**
   * The player's name
   */
  public name: string;

  public updateHand(cards: string[]): void {
    super.updateHand(cards);
    this.getStatus();
  }

  /**
   * Displays the name, shown cards, and score of the player
   */
  private getStatus(): void {
    super.printStatus(this.name);
  }
}
