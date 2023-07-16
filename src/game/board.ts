import { createState } from '../events';
import { callAll } from '../utils/function';
import { Game } from './game';
import { Piece } from './piece/piece';

export class Board extends Array<Array<Piece | null>> {
  readonly lastMovedPiece = createState<Piece | null>(null);
  readonly selectedPiece = createState<Piece | null>(null);

  private readonly removeListeners = callAll.bind(null, [
      this.lastMovedPiece.listen(() => {
      const piece = this.lastMovedPiece.value;
      if (!piece) return;

      const from = piece.lastPosition;
      const to = piece.position;

      this[from[0]][from[1]] = null;
      this[to[0]][to[1]] = piece;
    }),
  ]);

  constructor(readonly game: Game) {
    super();

    for (let i = 0; i < 8; i++) {
      const row = this[i] ??= [];

      for (let j = 0; j < 8; j++) {
        row.push(null);
      }
    }
  }

  toString() {
    return this.map(row =>
      row.map(piece => piece?.toString() ?? 'XX').join(' '),
    ).join('\n');
  }
}

export function getCheckerKey(i: number, j: number) {
  return i * 8 + j;
}
