import { Position } from '@/game/types';
import { Piece } from './piece';

export class Knight extends Piece {
  get symbol() {
    return 'N';
  }

  protected calcAvailableMoves() {
    const availableMoves: Position[] = [];
    const directions = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1]
    ];

    for (const direction of directions) {
      const [deltaRow, deltaCol] = direction;
      const row = this.position[0] + deltaRow;
      const col = this.position[1] + deltaCol;

      if (row >= 0 && row < 8 && col >= 0 && col < 8) {
        if (!this.board[row][col] || this.board[row][col]?.color !== this.color) {
          availableMoves.push([row, col]);
        }
      }
    }

    return availableMoves;
  }
}
