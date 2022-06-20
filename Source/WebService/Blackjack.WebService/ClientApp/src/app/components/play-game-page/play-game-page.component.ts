import { Component } from "@angular/core";
import { }
@Component({
  templateUrl: './play-game-page.component.html',
  styleUrls: ['./play-game-page.component.html']
})
export class PlayGameComponent {

  public wager: number = 0;

  public _addToWager(chipValue: number): void {
    this.wager += chipValue;
  }

  public _clearWager(): void {
    this.wager = 0;
  }
}
