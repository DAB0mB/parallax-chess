import { createState } from '@/events';
import { Piece } from './piece/piece';

export class Board extends Array<Array<Piece | null>> {
  readonly moved = createState<Piece | null>(null);
  readonly selected = createState<Piece | null>(null);

  private readonly offMoved = this.moved.on(() => {
    const piece = this.moved.value;
    if (!piece) return;

    const from = piece.lastPosition;
    const to = piece.position;

    const oldPiece = this[to[0]][to[1]];
    oldPiece?.delete();

    this[from[0]][from[1]] = null;
    this[to[0]][to[1]] = piece;

    this.unselect();
  });

  constructor(readonly pieces: Piece[]) {
    super();

    for (let i = 0; i < 8; i++) {
      const row = this[i] ??= [];

      for (let j = 0; j < 8; j++) {
        row.push(null);
      }
    }

    for (const piece of pieces) {
      this[piece.position[0]][piece.position[1]] = piece;
      piece.board = this;
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
