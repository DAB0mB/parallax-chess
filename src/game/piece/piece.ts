import { createState } from '../../events';
import { cacheProperty, invalidateProperty } from '../../utils/class';
import { callAll } from '../../utils/function';
import { Player } from '../player';
import { Position } from '../types';

export abstract class Piece {
  readonly lastPosition: Position = [-1, -1];
  readonly moved = createState(this.position);
  readonly deleted = createState(false);
  abstract get symbol(): string;

  private readonly removeListeners = callAll.bind(null, [
    () => this.offMoved(),
  ]);

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

  private offMoved() {
  }

  private delete() {
    this.removeListeners();

    this.player.pieces.delete(this);
    this.board[this.position[0]][this.position[1]] = null;
    this.deleted.value = true;
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

    const piece = this.board[position[0]][position[1]];
    piece?.delete();

    Object.assign(this.lastPosition, this.position);
    Object.assign(this.position, position);

    this.moved.value = position;

    this.board.moved.reset(this);
    this.board.unselect();
  }

  select() {
    this.board.selected.value = this;
  }
}
