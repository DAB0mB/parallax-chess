import { createState } from '@/events';
import { callAll } from '@/utils/function';
import { Game } from './game';
import { Piece } from './piece/piece';

export class Board extends Array<Array<Piece | null>> {
  readonly moved = createState<Piece | null>(null);
  readonly selected = createState<Piece | null>(null);

  private readonly offEvents = callAll.bind(null, [
    this.moved.listen(() => {
      const piece = this.moved.value;
      if (!piece) return;

      const from = piece.lastPosition;
      const to = piece.position;

      const oldPiece = this[to[0]][to[1]];
      oldPiece?.delete();

      this[from[0]][from[1]] = null;
      this[to[0]][to[1]] = piece;

      this.unselect();
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

  select(piece: Piece) {
    this.selected.value = piece;
  }

  unselect() {
    this.selected.value = null;
  }
}

export function getCheckerKey(row: number, col: number) {
  return row * 8 + col;
}
