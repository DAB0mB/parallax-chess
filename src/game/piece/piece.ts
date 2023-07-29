import { createState } from '@/events';
import { Color, Position } from '@/game/types';
import { cacheProperty, invalidateProperty } from '@/utils/class';
import { Board } from '../board';

export abstract class Piece {
  private _board?: Board;
  readonly moved = createState(this.position);
  readonly deleted = createState(false);
  abstract get symbol(): string;

  get board() {
    if (!this._board) {
      throw new Error('Piece.board not set');
    }

    return this._board;
  }

  set board(board: Board) {
    this._board = board;
  }

  get availableMoves() {
    this.offMoved = this.board.moved.on(() => {
      this.offMoved();
      invalidateProperty(this, 'availableMoves');
    });

    return cacheProperty(this, 'availableMoves', this.calcAvailableMoves());
  }

  constructor(readonly color: Color, public position: Position) {
  }

  toString() {
    return `${this.color}${this.symbol}`;
  }

  private offMoved() {
  }

  delete() {
    this.offMoved();
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
