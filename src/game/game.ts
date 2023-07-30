import { createState } from '@/events';
import { Board } from './board';
import { Bishop } from './piece/bishop';
import { King } from './piece/king';
import { Knight } from './piece/knight';
import { Pawn } from './piece/pawn';
import { Queen } from './piece/queen';
import { Rook } from './piece/rook';
import { Player } from './player';
import { Color } from './types';

export class Game {
  readonly pieces = [
    new Rook(Color.BLACK, [0, 0]),
    new Knight(Color.BLACK, [0, 1]),
    new Bishop(Color.BLACK, [0, 2]),
    new King(Color.BLACK, [0, 3]),
    new Queen(Color.BLACK, [0, 4]),
    new Bishop(Color.BLACK, [0, 5]),
    new Knight(Color.BLACK, [0, 6]),
    new Rook(Color.BLACK, [0, 7]),
    new Pawn(Color.BLACK, [1, 0]),
    new Pawn(Color.BLACK, [1, 1]),
    new Pawn(Color.BLACK, [1, 2]),
    new Pawn(Color.BLACK, [1, 3]),
    new Pawn(Color.BLACK, [1, 4]),
    new Pawn(Color.BLACK, [1, 5]),
    new Pawn(Color.BLACK, [1, 6]),
    new Pawn(Color.BLACK, [1, 7]),
    new Rook(Color.WHITE, [7, 0]),
    new Knight(Color.WHITE, [7, 1]),
    new Bishop(Color.WHITE, [7, 2]),
    new King(Color.WHITE, [7, 3]),
    new Queen(Color.WHITE, [7, 4]),
    new Bishop(Color.WHITE, [7, 5]),
    new Knight(Color.WHITE, [7, 6]),
    new Rook(Color.WHITE, [7, 7]),
    new Pawn(Color.WHITE, [6, 0]),
    new Pawn(Color.WHITE, [6, 1]),
    new Pawn(Color.WHITE, [6, 2]),
    new Pawn(Color.WHITE, [6, 3]),
    new Pawn(Color.WHITE, [6, 4]),
    new Pawn(Color.WHITE, [6, 5]),
    new Pawn(Color.WHITE, [6, 6]),
    new Pawn(Color.WHITE, [6, 7]),
  ];
  readonly board = new Board(this.pieces);
  readonly whitePlayer = new Player(this.pieces.slice(16));
  readonly blackPlayer = new Player(this.pieces.slice(0, 16));
  readonly currentPlayer = createState(this.whitePlayer);
  readonly otherPlayer = createState(this.blackPlayer);
  readonly winner = createState<Player | null>(null);

  protected readonly offMoved = this.board.moved.on(() => {
    const winner = this.winner.value = this.calcWinner();
    if (winner) return;

    const currentPlayer = this.otherPlayer.value;
    const otherPlayer = this.currentPlayer.value;
    this.otherPlayer.value = otherPlayer;
    this.currentPlayer.value = currentPlayer;
  });

  private calcWinner(): Player | null {
    const piece = this.board.moved.value;
    if (!piece) return null;

    const king = this.otherPlayer.value.king;
    if (piece.position[0] !== king.position[0]) return null;
    if (piece.position[1] !== king.position[1]) return null;

    return this.currentPlayer.value;
  }
}
