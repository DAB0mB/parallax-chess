import { King } from './piece/king';
import { Piece } from './piece/piece';

export class Player {
  readonly king: King;

  get color() {
    return this.king.color;
  }

  constructor(readonly pieces: Piece[]) {
    this.king = this.findKing();
  }

  private findKing() {
    const king = this.pieces.find(piece => piece instanceof King);
    if (!king) {
      throw new Error('King not found');
    }

    return king as King;
  }
}
