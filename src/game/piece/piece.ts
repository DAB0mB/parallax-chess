import { Color, Position } from '@/game/types';
import { cacheProperty, invalidateProperty } from '@/utils/class';
import { State } from 'event-ops';
import { Board } from '../board';

export abstract class Piece {
  readonly moved: State<Position>;
  readonly deleted: State<boolean>;
  abstract get symbol(): string;

  get board(): Board {
    throw new Error('Board not set');
  }

  set board(board: Board) {
    cacheProperty(this, 'board', board);
  }

  get availableMoves() {
    this.clearMoved = this.board.moved.listen(() => {
      this.clearMoved();
      invalidateProperty(this, 'availableMoves');
    });

    return cacheProperty(this, 'availableMoves', this.calcAvailableMoves());
  }

  constructor(readonly color: Color, public position: Position) {
    this.moved = new State(this.position);
    this.deleted = new State(false);
  }

  toString() {
    return `${this.color}${this.symbol}`;
  }

  private clearMoved() {
    // override
  }

  delete() {
    this.clearMoved();
    this.deleted.value = true;
  }

  protected abstract calcAvailableMoves(): Position[];

  move(position: Position) {
    const isValidMove = this.availableMoves.some(move => move[0] === position[0] && move[1] === position[1]);
    if (!isValidMove) {
      throw new Error('Invalid move');
    }

    this.moved.value = this.position = position;
  }
}
