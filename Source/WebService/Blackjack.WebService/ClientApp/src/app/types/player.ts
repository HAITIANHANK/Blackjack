import { Gamer } from "./gamer";

export class Player extends Gamer {
  /**
   * The player's name
   */
  public name: string;

  public updateHand(cards: string[]): void {
    super.updateHand(cards);
    super.calcStatus(this.name);
  }
}
