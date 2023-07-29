import { createState } from '@/events';
import { Player } from '@/game/player';
import { Position } from '@/game/types';
import { cacheProperty, invalidateProperty } from '@/utils/class';

export abstract class Piece {
  readonly lastPosition: Position = [-1, -1];
  readonly moved = createState(this.position);
  readonly deleted = createState(false);
  abstract get symbol(): string;

  get game() {
    return this.player.game;
  }

  get board() {
    return this.player.board;
  }

  get availableMoves() {
    this.offMoved = this.board.moved.listen(() => {
      this.offMoved();
      invalidateProperty(this, 'availableMoves');
    });

    return cacheProperty(this, 'availableMoves', this.calculateAvailableMoves());
  }

  constructor(readonly player: Player, readonly position: Position) {
    this.board[position[0]][position[1]] = this;
  }

  toString() {
    return `${this.player.color}${this.symbol}`;
  }

  private offMoved() {
  }

  delete() {
    this.offMoved();
    this.player.pieces.delete(this);
    this.deleted.value = true;
  }

  protected abstract calculateAvailableMoves(): Position[];

  move(position: Position) {
    const isValidMove = this.availableMoves.some(move => move[0] === position[0] && move[1] === position[1]);
    if (!isValidMove) {
      throw new Error('Invalid move');
    }

    Object.assign(this.lastPosition, this.position);
    Object.assign(this.position, position);

    this.moved.value = position;
    this.board.moved.reset(this);
  }
}
