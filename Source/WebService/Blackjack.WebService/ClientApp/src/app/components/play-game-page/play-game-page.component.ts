import { Component, OnInit } from "@angular/core";
import { UserApi } from "../../../shared/api/user.api";
import { UserDto } from "../../../shared/dtos/user.dto";

@Component({
  templateUrl: './play-game-page.component.html',
  styleUrls: ['./play-game-page.component.html']
})
export class PlayGameComponent implements OnInit {

  /**
   * The UserDto object containing the logged in player's data
   */
  public player: UserDto;

  /**
   * The amount the player is betting on a single hand of blackjack
   */
  public wager: number = 0;

  constructor(private _userApi: UserApi) {
  }

  /**
   * Removes predertimined amounts from the player's balance and
   * adds it to the upcoming hand's wager
   * @param chipValue
   */
  public _addToWager(chipValue: number): void {
    this.wager += chipValue;
    this.player.balance -= chipValue;
  }

  /**
   * Returns funds to the player's balance and resets the wager to 0.
   */
  public _clearWager(): void {
    this.player.balance += this.wager;
    this.wager = 0;
  }

  public async ngOnInit(): Promise<void> {
    this.player = await this._userApi.getUser('test');
  }


}
