import { cacheProperty, invalidateProperty } from '../../utils/class';
import { callAll } from '../../utils/function';
import { Player } from '../player';
import { Position } from '../types';

export abstract class Piece {
  readonly lastPosition: Position = [-1, -1];
  abstract get symbol(): string;

  private readonly removeListeners = callAll.bind(null, [
    this.board.lastMovedPiece.listen(() => {
      invalidateProperty(this, 'availableMoves');

      const lastMovedPiece = this.board.lastMovedPiece.value;
      if (!lastMovedPiece) return;

      const attacked = (
        lastMovedPiece.position[0] === this.position[0] &&
        lastMovedPiece.position[1] === this.position[1]
      )
      if (!attacked) return;

      this.removeFromGame();
    }),
  ]);

  get game() {
    return this.player.game;
  }

  get board() {
    return this.player.board;
  }

  get availableMoves() {
    return cacheProperty(this, 'availableMoves', this.calculateAvailableMoves());
  }

  constructor(readonly player: Player, readonly position: Position) {
    this.board[position[0]][position[1]] = this;
  }

  private removeFromGame() {
    this.removeListeners();
    this.player.pieces.delete(this);
  }

  protected abstract calculateAvailableMoves(): Position[];

  toString() {
    return `${this.player.color}${this.symbol}`;
  }

  move(position: Position) {
    const isValidMove = this.availableMoves.some(move => move[0] === position[0] && move[1] === position[1]);
    if (!isValidMove) {
      throw new Error('Invalid move');
    }

    Object.assign(this.lastPosition, this.position);
    Object.assign(this.position, position);

    this.board.lastMovedPiece.value = this;
  }

  select() {
    this.board.selectedPiece.value = this;
  }
}
