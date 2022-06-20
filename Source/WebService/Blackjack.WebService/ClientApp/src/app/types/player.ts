import { Gamer } from "./gamer";

export class Player extends Gamer {
  /**
   * The player's name
   */
  public name: string = '';

  /**
   * Displays the name, shown cards, and score of the player
   */
  public getStatus(): string {
    return super.printStatus(this.name);
  }
}
