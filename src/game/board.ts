import { createState } from '@/events';
import { Unlistener } from '@/events/emitter';
import { callAll } from '@/utils/function';
import { Piece } from './piece/piece';

export class Board extends Array<Array<Piece | null>> {
  readonly moved = createState<Piece | null>(null);
  readonly selected = createState<Piece | null>(null);
  protected readonly offPieceMoved: Unlistener;

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

    this.offPieceMoved = callAll.bind(null, pieces.map((piece) => {
      let lastPosition = piece.position;

      return piece.moved.on(() => {
        const from = lastPosition;
        const to = piece.position;
        lastPosition = piece.position;

        const oldPiece = this[to[0]][to[1]];
        oldPiece?.delete();

        this[from[0]][from[1]] = null;
        this[to[0]][to[1]] = piece;

        this.unselect();
        this.moved.reset(piece);
      });
    }));
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
