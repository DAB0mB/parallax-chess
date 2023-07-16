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
  }

  toString() {
    return this.map(row =>
      row.map(piece => piece?.toString() ?? 'XX').join(' '),
    ).join('\n');
  }
}
