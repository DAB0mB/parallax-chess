import blackBishopSvg from '@/assets/chess_pieces/black_bishop.svg?raw';
import blackKingSvg from '@/assets/chess_pieces/black_king.svg?raw';
import blackKnightSvg from '@/assets/chess_pieces/black_knight.svg?raw';
import blackPawnSvg from '@/assets/chess_pieces/black_pawn.svg?raw';
import blackQueenSvg from '@/assets/chess_pieces/black_queen.svg?raw';
import blackRookSvg from '@/assets/chess_pieces/black_rook.svg?raw';
import whiteBishopSvg from '@/assets/chess_pieces/white_bishop.svg?raw';
import whiteKingSvg from '@/assets/chess_pieces/white_king.svg?raw';
import whiteKnightSvg from '@/assets/chess_pieces/white_knight.svg?raw';
import whitePawnSvg from '@/assets/chess_pieces/white_pawn.svg?raw';
import whiteQueenSvg from '@/assets/chess_pieces/white_queen.svg?raw';
import whiteRookSvg from '@/assets/chess_pieces/white_rook.svg?raw';
import { noopEvent } from '@/events';
import { useEvent, useValue } from '@/events/hooks';
import { Pawn } from '@/game/piece/pawn';
import { Piece as GamePiece } from '@/game/piece/piece';
import { withVars } from '@/utils/style';
import css from './piece.module.css';

export const PieceIcons = {
  BP: URL.createObjectURL(new Blob([blackPawnSvg], { type: 'image/svg+xml' })),
  BR: URL.createObjectURL(new Blob([blackRookSvg], { type: 'image/svg+xml' })),
  BB: URL.createObjectURL(new Blob([blackBishopSvg], { type: 'image/svg+xml' })),
  BN: URL.createObjectURL(new Blob([blackKnightSvg], { type: 'image/svg+xml' })),
  BQ: URL.createObjectURL(new Blob([blackQueenSvg], { type: 'image/svg+xml' })),
  BK: URL.createObjectURL(new Blob([blackKingSvg], { type: 'image/svg+xml' })),
  WP: URL.createObjectURL(new Blob([whitePawnSvg], { type: 'image/svg+xml' })),
  WR: URL.createObjectURL(new Blob([whiteRookSvg], { type: 'image/svg+xml' })),
  WB: URL.createObjectURL(new Blob([whiteBishopSvg], { type: 'image/svg+xml' })),
  WN: URL.createObjectURL(new Blob([whiteKnightSvg], { type: 'image/svg+xml' })),
  WQ: URL.createObjectURL(new Blob([whiteQueenSvg], { type: 'image/svg+xml' })),
  WK: URL.createObjectURL(new Blob([whiteKingSvg], { type: 'image/svg+xml' })),
} as const;

export type PieceProps = {
  piece: GamePiece,
};

export function Piece(props: PieceProps) {
  const icon = PieceIcons[props.piece.toString() as keyof typeof PieceIcons];
  const deleted = useValue(props.piece.deleted);
  const [row, col] = useValue(props.piece.moved);

  useEvent(props.piece instanceof Pawn ? props.piece.upgraded : noopEvent)

  if (deleted) return null;

  return (
    <div className={css.piece} role='button' style={withVars({ col: `${col}em`, row: `${row}em` })}>
      <img className={css.icon} src={icon} />
    </div>
  );
}
