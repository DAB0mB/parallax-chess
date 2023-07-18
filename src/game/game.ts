import { createState } from '../events';
import { callAll } from '../utils/function';
import { Board } from './board';
import { Player } from './player';
import { Color } from './types';

export class Game {
  readonly board = new Board(this);
  readonly player1 = new Player(this, Color.WHITE);
  readonly player2 = new Player(this, Color.BLACK);
  readonly currentPlayer = createState(this.player1);
  readonly otherPlayer = createState(this.player2);
  readonly winner = createState<Player | null>(null);

  private readonly removeListeners = callAll.bind(null, [
    this.board.moved.listen(() => {
      const currentPlayer = this.otherPlayer.value;
      const otherPlayer = this.currentPlayer.value;
      this.otherPlayer.value = otherPlayer;
      this.currentPlayer.value = currentPlayer;
      this.winner.value = this.calcWinner();
    }),
  ]);

  private calcWinner(): Player | null {
    const king = this.currentPlayer.value.king;
    if (king.availableMoves.length) return null;

    const piece = this.board.moved.value;
    if (!piece) return null;

    const canAttackKing = piece.availableMoves.some((position) => {
      return position[0] === king.position[0] && position[1] === king.position[1];
    });
    if (!canAttackKing) return null;

    for (const piece of this.currentPlayer.value.pieces) {
      const canCounterAttack = piece.availableMoves.some((position) => {
        return position[0] === piece.position[0] && position[1] === piece.position[1];
      });
      if (canCounterAttack) return null;
    }

    return this.otherPlayer.value;
  }
}
