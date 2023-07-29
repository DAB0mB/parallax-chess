import { Position } from '@/game/types';
import { Piece } from './piece';

export class Bishop extends Piece {
  get symbol() {
    return 'B';
  }

  protected calcAvailableMoves() {
    const availableMoves: Position[] = [];
    const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]]; // Top Left, Top Right, Bottom Left, Bottom Right

    for (const direction of directions) {
      const [deltaRow, deltaCol] = direction;
      let row = this.position[0] + deltaRow;
      let col = this.position[1] + deltaCol;

      while (row >= 0 && row < 8 && col >= 0 && col < 8) {
        if (!this.board[row][col]) {
          availableMoves.push([row, col]);
        } else if (this.board[row][col]?.color !== this.color) {
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
