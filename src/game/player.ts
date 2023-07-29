import { King } from './piece/king';
import { Piece } from './piece/piece';

export class Player {
  readonly king = this.findKing();
  readonly color = this.king.color;

  constructor(readonly pieces: Piece[]) {
  }

  private findKing() {
    const king = this.pieces.find(piece => piece instanceof King);
    if (!king) {
      throw new Error('King not found');
    }

    return king;
  }
}
