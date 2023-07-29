import { Position } from '@/game/types';
import { Piece } from './piece';

export class King extends Piece {
  get symbol() {
    return 'K';
  }

  protected calcAvailableMoves() {
    const availableMoves: Position[] = [];
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1], // Up, Down, Left, Right
      [-1, -1], [-1, 1], [1, -1], [1, 1] // Top Left, Top Right, Bottom Left, Bottom Right
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
