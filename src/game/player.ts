import { Game } from './game';
import { Bishop } from './piece/bishop';
import { King } from './piece/king';
import { Knight } from './piece/knight';
import { Pawn } from './piece/pawn';
import { Piece } from './piece/piece';
import { Queen } from './piece/queen';
import { Rook } from './piece/rook';
import { Color } from './types';

export class Player {
  readonly king: King;
  readonly pieces: Set<Piece>;

  get board() {
    return this.game.board;
  }

  constructor(readonly game: Game, readonly color: Color) {
    const [row1, row2] = this.color === Color.WHITE ? [7, 6] : [0, 1];

    this.pieces = new Set([
      new Rook(this, [row1, 0]),
      new Knight(this, [row1, 1]),
      new Bishop(this, [row1, 2]),
      this.king = new King(this, [row1, 3]),
      new Queen(this, [row1, 4]),
      new Bishop(this, [row1, 5]),
      new Knight(this, [row1, 6]),
      new Rook(this, [row1, 7]),
      new Pawn(this, [row2, 0]),
      new Pawn(this, [row2, 1]),
      new Pawn(this, [row2, 2]),
      new Pawn(this, [row2, 3]),
      new Pawn(this, [row2, 4]),
      new Pawn(this, [row2, 5]),
      new Pawn(this, [row2, 6]),
      new Pawn(this, [row2, 7]),
    ]);
  }
}
