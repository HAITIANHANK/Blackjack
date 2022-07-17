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
  * Reference to play button used to start a game.
  */
  public playBtnEl: HTMLButtonElement = document.getElementById('playBtn') as HTMLButtonElement;

  /**
   * Reference to hit button to add cards to the player's hand. 
   */
  public hitBtnEl: HTMLButtonElement = document.getElementById('hitBtn') as HTMLButtonElement;
  //public hitBtnEl: HTMLButtonElement = document.getElementById('hitBtn') as HTMLButtonElement;

  /**
   * Reference to stay button to signal the player is not taking cards. 
   */
  public stayBtnEl: HTMLButtonElement = document.getElementById('stayBtn') as HTMLButtonElement;
  //public stayBtnEl: HTMLButtonElement = document.getElementById('stayBtn') as HTMLButtonElement;

  /**
   * Reference to play again button to restart the game. 
   */
  public playAgainButtonEl: HTMLButtonElement = document.getElementById('playAgain') as HTMLButtonElement;
  //public playAgainButtonEl: HTMLButtonElement = document.getElementById('playAgain') as HTMLButtonElement;

  /**
   * Reference to the label displaying the card information of the dealer. 
   */
  public houseHandLabelEl: HTMLLabelElement = document.getElementById('houseHand') as HTMLLabelElement;
  //public houseHandLabelEl: HTMLLabelElement = document.getElementById('houseHand') as HTMLLabelElement;

  /**
   * Reference to the label displaying the card information of the player. 
   */
  public playerHandLabelEl: HTMLLabelElement = document.getElementById('playerHand') as HTMLLabelElement;
  //public playerHandLabelEl: HTMLLabelElement = document.getElementById('playerHand') as HTMLLabelElement;

  /**
   * Reference to the label asking the player their next move as well as the outcome of the game.
   */
  public nextMoveLabelEl: HTMLLabelElement = document.getElementById('nextMove') as HTMLLabelElement;
  //public nextMoveLabelEl: HTMLLabelElement = document.getElementById('nextMove') as HTMLLabelElement;

  /**
  * Reference to the div containing all possible wager buttons
  */
  public playAreaDivEl: HTMLDivElement = document.getElementById('playArea') as HTMLDivElement;
  //public playAreaDivEl: HTMLDivElement = document.getElementById('playArea') as HTMLDivElement;

  /**
  * Reference to the div containing all possible wager buttons
  */
  public wagerOptionsDivEl: HTMLDivElement = document.getElementById('wagerOptions') as HTMLDivElement;
  //public wagerOptionsDivEl: HTMLDivElement = document.getElementById('wagerOptions') as HTMLDivElement;

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
    let decks: number = parseInt(prompt('How many decks are you playing with?', '1'));
    while (isNaN(decks) || decks < 1) {
      decks = parseInt(prompt(`${decks} is not a valid amount, please try again.`, '1'));
    }
    console.log('in play 1');
    this.deck.shuffle(decks);
    this.player.updateHand(this.deck.deal(2));
    this.dealer.updateHand(this.deck.deal(2));
    this.playBtnEl.classList.add('hidden');
    this.wagerOptionsDivEl.classList.add('hidden');
    this.playerHandLabelEl.innerText = this.player.getStatus();
    console.log('in play');

    /*Checks for blackjacks. If anyone does, game automatically ends.*/
    if (this.player.hasBlackJack() && this.dealer.hasBlackJack()) {
      this.revealDealer();
      this.nextMoveLabelEl.innerText = BlackjackOutcomes.BothBlackjack;
      this.playAgainButtonEl.classList.remove('hidden');
      return;
    }
    else if (this.player.hasBlackJack() && !this.dealer.hasBlackJack()) {
      this.revealDealer();
      this.nextMoveLabelEl.innerText = BlackjackOutcomes.PlayerBlackjack;
      this.playAgainButtonEl.classList.remove('hidden');
      return;
    }
    else if (!this.player.hasBlackJack() && this.dealer.hasBlackJack()) {
      this.revealDealer();
      this.nextMoveLabelEl.innerText = BlackjackOutcomes.DealerBlackjack;
      this.playAgainButtonEl.classList.remove('hidden');
      return;
    }

    this.houseHandLabelEl.innerText = this.dealer.getStatus();
    this.nextMoveLabelEl.innerText = BlackjackOutcomes.PlayerChoice;
    this.showGameButtons();
  }

  /**
   * Gives the player another card but automatically ends play if the player busts. 
   */
  public hit(): void {
    this.player.updateHand(this.deck.deal(1));
    this.playerHandLabelEl.innerText = this.player.getStatus();
    if (this.player.hasBusted) {
      this.revealDealer();
      this.nextMoveLabelEl.innerText = BlackjackOutcomes.DealerWin;
      this.playAgainButtonEl.classList.remove('hidden');
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
        if (this.dealer.score < this.player.score || this.dealer.hasBusted)
          this.nextMoveLabelEl.innerText = BlackjackOutcomes.PlayerWin;
        else if (this.dealer.score > this.player.score)
          this.nextMoveLabelEl.innerText = BlackjackOutcomes.DealerWin;
        else
          this.nextMoveLabelEl.innerText = BlackjackOutcomes.Push;
        this.playAgainButtonEl.classList.remove('hidden');
        return;
      }
      this.dealer.updateHand(this.deck.deal(1));
      this.houseHandLabelEl.innerText = this.dealer.getStatus();
    }, 2000);
  }

  /**
   * Resets the player and dealer and starts a new game.
   */
  public playAgain(): void {
    this.playAgainButtonEl.classList.add('hidden');
    this.playAreaDivEl.classList.add('hidden');
    this.wagerOptionsDivEl.classList.remove('hidden');
    this.player.reset();
    this.dealer.reset();
    this.startGame();
  }

  /**
   * Changes the dealer state to reveal his cards and prevent player from taking actions. 
   */
  public revealDealer(): void {
    this.dealer.isDealerTurn = true;
    this.houseHandLabelEl.innerText = this.dealer.getStatus();
    this.hideGameButtons();
  }

  /**
   * Hides the Hit and Stay buttons to prevent player from taking actions. 
   */
  public hideGameButtons(): void {
    this.hitBtnEl.classList.add('hidden');
    this.stayBtnEl.classList.add('hidden');
  }

  /**
   * Reveals the Hit and Stay buttons to allow the player to take actions. 
   */
  public showGameButtons(): void {
    this.hitBtnEl.classList.remove('hidden');
    this.stayBtnEl.classList.remove('hidden');
  }
  /*TO DO: implement update user endpoint*/
  public winOutcome(): void {
    this.user.balance += (this.wager * 2);
  }

  /**TO DO: Implement update user endpoint */
  public loseOutcome(): void {

  }

  public async ngOnInit(): Promise<void> {
    this.user = await this._userApi.getUser('test');
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

