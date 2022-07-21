import { Component, OnInit } from "@angular/core";
import { UserApi } from "../../../shared/api/user.api";
import { UserDto } from "../../../shared/dtos/user.dto";
import { Dealer } from "../../types/dealer";
import { Deck } from "../../types/deck";
import { Player } from "../../types/player";

@Component({
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent implements OnInit {

  /**
   * The UserDto object containing the logged in user's data
   */
  public user: UserDto;

  /**
   * Player object containing the player's information. 
   */
  public player: Player = new Player();

  /**
   * Dealer object containing the dealer's information.
   */
  public dealer: Dealer = new Dealer();

  /**
   * Deck object containing all possible cards that can still be drawn. 
   */
  public deck: Deck = new Deck();

  /**
   * The amount the player is betting on a single hand of blackjack
   */
  public wager: number = 0;

  /**
   * The number of decks the player is playing with.
   */
  public deckQty: number = 1;

  /**
   * Determines if the wager options div and play button will be hidden.
   */
  public isPregameHidden: boolean = false;

  /**
   * Determines if the entire Play Area div will be hidden.
   */
  public isPlayAreaHidden: boolean = true;

  /**
    * Determines if the Play Again button will be hidden.
    */
  public isPlayAgainHidden: boolean = true;

  /**
  * Determines if the Hit and Stay buttons will be hidden.
  */
  public isGameButtonHidden: boolean = true;
  /**
   * Explains to the player what play options are available as well
   * as the outcome of the game.
   */
  public nextMove: string;

  constructor(private _userApi: UserApi) {
  }

  /**
   * Removes predertimined amounts from the player's balance and
   * adds it to the upcoming hand's wager
   * @param chipValue
   */
  public _addToWager(chipValue: number): void {
    if (chipValue > this.user.balance) {
      alert('You have insufficient funds for this wager.');
      return;
    }
    this.wager += chipValue;
    this.user.balance -= chipValue;
  }

  /**
   * Returns funds to the player's balance and resets the wager to 0.
   */
  public _clearWager(): void {
    this.user.balance += this.wager;
    this.wager = 0;
  }

  /**
  * Begins the game by allowing players to enter their name and how many decks to play with.
  * Also determines if either the player, dealer, or both have black jack.
  */
  public startGame(): void {
    if (isNaN(this.deckQty) || this.deckQty < 1) {
      alert(`${this.deckQty} is not a valid amount of decks, please try again.`);
      return;
    }
    this.deck.shuffle(this.deckQty);
    this.player.updateHand(this.deck.deal(2));
    this.dealer.updateHand(this.deck.deal(2));
    this.isPregameHidden = true;
    this.isPlayAreaHidden = false;

    /*Checks for blackjacks. If anyone does, game automatically ends.*/
    if (this.player.hasBlackJack() && this.dealer.hasBlackJack()) {
      this.revealDealer();
      this.nextMove = BlackjackOutcomes.BothBlackjack;
      this.pushOutcome();
      this.isPlayAgainHidden = false;
      return;
    }
    else if (this.player.hasBlackJack() && !this.dealer.hasBlackJack()) {
      this.revealDealer();
      this.nextMove = BlackjackOutcomes.PlayerBlackjack;
      this.winOutcome();
      this.isPlayAgainHidden = false;
      return;
    }
    else if (!this.player.hasBlackJack() && this.dealer.hasBlackJack()) {
      this.revealDealer();
      this.nextMove = BlackjackOutcomes.DealerBlackjack;
      this.loseOutcome();
      this.isPlayAgainHidden = false;
      return;
    }
    this.nextMove = BlackjackOutcomes.PlayerChoice;
    this.isGameButtonHidden = false;
  }

  /**
   * Gives the player another card but automatically ends play if the player busts. 
   */
  public hit(): void {
    this.player.updateHand(this.deck.deal(1));
    if (this.player.hasBusted) {
      this.revealDealer();
      this.nextMove = BlackjackOutcomes.DealerWin;
      this.loseOutcome();
      this.isPlayAgainHidden = false;
      this.isGameButtonHidden = true;
    }
  }

  /**
   * Ends the players turn, reveals dealer's cards, hides game buttons, and plays
   * the dealer's hand over two second intervals.
   */
  public stay(): void {
    this.revealDealer();
    const intervalID = setInterval(() => {
      if (this.dealer.score > 17 || (this.dealer.score === 17 && !this.dealer.hasSoft17()) || this.dealer.hasBusted) {
        clearInterval(intervalID);
        if (this.dealer.score < this.player.score || this.dealer.hasBusted) {
          this.nextMove = BlackjackOutcomes.PlayerWin;
          this.winOutcome();
        }
        else if (this.dealer.score > this.player.score) {
          this.nextMove = BlackjackOutcomes.DealerWin;
          this.loseOutcome();
        }
        else {
          this.nextMove = BlackjackOutcomes.Push;
          this.pushOutcome();
        }
        this.isPlayAgainHidden = false;
        return;
      }
      this.dealer.updateHand(this.deck.deal(1));
    }, 2000);
  }

  /**
   * Resets the player and dealer and starts a new game.
   */
  public playAgain(): void {
    this.isPregameHidden = false;
    this.isPlayAreaHidden = true;
    this.isPlayAgainHidden = true;
    this.isGameButtonHidden = true;
    this.player.reset();
    this.dealer.reset();
  }

  /**
   * Changes the dealer state to reveal his cards and prevent player from taking actions. 
   */
  public revealDealer(): void {
    this.dealer.isDealerTurn = true;
    this.dealer.setStatus();
    this.isGameButtonHidden = true;
  }

  /*TO DO: implement update user endpoint*/
  public winOutcome(): void {
    this.user.balance += (this.wager * 2);
    this.wager = 0;
  }

  /**TO DO: Implement update user endpoint */
  public loseOutcome(): void {
    this.wager = 0;
  }

  /**TO DO: Implement update user endpoint */
  public pushOutcome(): void {
    this.user.balance += this.wager;
    this.wager = 0;
  }

  public async ngOnInit(): Promise<void> {
    this.user = new UserDto();
    this.user.balance = 500;
    this.user.username = 'Test';
    //this.user = await this._userApi.getUser('test');
    this.player.name = this.user.username;
  }
}

/**
 * Contains possible entries for the Next Move label.
 */
enum BlackjackOutcomes {
  BothBlackjack = 'You both have 21! It\'s a push! Play again?',
  PlayerBlackjack = 'You have 21! You win! Play again?',
  DealerBlackjack = 'Dealer has 21! You lose! Play again?',
  PlayerWin = 'You win! Play again?',
  DealerWin = 'Dealer wins! Play again?',
  PlayerChoice = 'What would you like to do?',
  Push = 'You tied. It\'s a push!'
}

