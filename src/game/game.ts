import { createState } from '@/events';
import { Board } from './board';
import { Player } from './player';
import { Color } from './types';

export class Game {
  readonly board = new Board(this);
  readonly player1 = new Player(this, 'WHITE', Color.WHITE);
  readonly player2 = new Player(this, 'BLACK', Color.BLACK);
  readonly currentPlayer = createState(this.player1);
  readonly otherPlayer = createState(this.player2);
  readonly winner = createState<Player | null>(null);

  private readonly offMoved = this.board.moved.listen(() => {
    const winner = this.winner.value = this.calcWinner();
    if (winner) return;

    const currentPlayer = this.otherPlayer.value;
    const otherPlayer = this.currentPlayer.value;
    this.otherPlayer.value = otherPlayer;
    this.currentPlayer.value = currentPlayer;
  });

  private calcWinner(): Player | null {
    const piece = this.board.moved.value;
    if (!piece) return null;

    const king = this.otherPlayer.value.king;
    if (piece.position[0] !== king.position[0]) return null;
    if (piece.position[1] !== king.position[1]) return null;

    return this.currentPlayer.value;
  }
}
