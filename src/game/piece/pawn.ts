import { createEvent } from '@/events';
import { Color, Position } from '@/game/types';
import { Piece } from './piece';
import { Queen } from './queen';

export class Pawn extends Piece {
  get symbol() {
    return 'P';
  }

  readonly upgraded = createEvent();

  protected calcAvailableMoves() {
    const availableMoves: Position[] = [];

    // Determine the direction of movement based on the player's color
    const direction = this.color === Color.WHITE ? -1 : 1;

    // Check if the pawn can move one step forward
    const oneStepForwardRow = this.position[0] + direction;
    const oneStepForwardCol = this.position[1];
    if (oneStepForwardRow >= 0 && oneStepForwardRow < 8 && !this.board[oneStepForwardRow][oneStepForwardCol]) {
      availableMoves.push([oneStepForwardRow, oneStepForwardCol]);
    }

    // Check if the pawn can move two steps forward from the starting position
    const startingRow = this.color === Color.WHITE ? 6 : 1;
    if (this.position[0] === startingRow && !this.board[oneStepForwardRow][oneStepForwardCol]) {
      const twoStepsForwardRow = this.position[0] + 2 * direction;
      const twoStepsForwardCol = this.position[1];
      if (!this.board[twoStepsForwardRow][twoStepsForwardCol]) {
        availableMoves.push([twoStepsForwardRow, twoStepsForwardCol]);
      }
    }

    // Check if the pawn can capture diagonally
    const captureMoves = [[oneStepForwardRow, this.position[1] - 1], [oneStepForwardRow, this.position[1] + 1]];
    for (const move of captureMoves) {
      const [row, col] = move;
      if (row >= 0 && row < 8 && col >= 0 && col < 8 && this.board[row][col] && this.board[row][col]?.color !== this.color) {
        availableMoves.push([row, col]);
      }
    }

    return availableMoves;
  }

  override move(position: Position): void {
    super.move(position);

    if (this.position[0] === 0 || this.position[0] === 7) {
      Object.setPrototypeOf(this, Queen.prototype);
      this.upgraded.emit();
    }
  }
}
