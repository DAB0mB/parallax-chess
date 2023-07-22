import { Position } from '@/game/types';
import { Piece } from './piece';

export class Rook extends Piece {
  get symbol() {
    return 'R';
  }

  protected calculateAvailableMoves() {
    const availableMoves: Position[] = [];

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right

    for (const direction of directions) {
      const [deltaRow, deltaCol] = direction;
      let row = this.position[0] + deltaRow;
      let col = this.position[1] + deltaCol;

      while (row >= 0 && row < 8 && col >= 0 && col < 8) {
        if (!this.board[row][col]) {
          availableMoves.push([row, col]);
        } else if (this.board[row][col]?.player !== this.player) {
          availableMoves.push([row, col]);
          break;
        } else {
          break;
        }

        row += deltaRow;
        col += deltaCol;
      }
    }

    return availableMoves;
  }
}
