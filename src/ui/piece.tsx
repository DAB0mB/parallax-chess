import blackBishopSvg from '@/assets/chess_pieces/black_bishop.svg';
import blackKingSvg from '@/assets/chess_pieces/black_king.svg';
import blackKnightSvg from '@/assets/chess_pieces/black_knight.svg';
import blackPawnSvg from '@/assets/chess_pieces/black_pawn.svg';
import blackQueenSvg from '@/assets/chess_pieces/black_queen.svg';
import blackRookSvg from '@/assets/chess_pieces/black_rook.svg';
import whiteBishopSvg from '@/assets/chess_pieces/white_bishop.svg';
import whiteKingSvg from '@/assets/chess_pieces/white_king.svg';
import whiteKnightSvg from '@/assets/chess_pieces/white_knight.svg';
import whitePawnSvg from '@/assets/chess_pieces/white_pawn.svg';
import whiteQueenSvg from '@/assets/chess_pieces/white_queen.svg';
import whiteRookSvg from '@/assets/chess_pieces/white_rook.svg';
import { noopEvent } from '@/events';
import { useEvent, useValue } from '@/events/hooks';
import { Pawn } from '@/game/piece/pawn';
import { Piece as GamePiece } from '@/game/piece/piece';
import { withVars } from '@/utils/style';
import css from './piece.module.css';

export const PieceIcons = {
  BP: <img className={css.icon} src={blackPawnSvg} alt='black pawn' />,
  BR: <img className={css.icon} src={blackRookSvg} alt='black rook' />,
  BB: <img className={css.icon} src={blackBishopSvg} alt='black bishop' />,
  BN: <img className={css.icon} src={blackKnightSvg} alt='black knight' />,
  BQ: <img className={css.icon} src={blackQueenSvg} alt='black queen' />,
  BK: <img className={css.icon} src={blackKingSvg} alt='black king' />,
  WP: <img className={css.icon} src={whitePawnSvg} alt='white pawn' />,
  WR: <img className={css.icon} src={whiteRookSvg} alt='white rook' />,
  WB: <img className={css.icon} src={whiteBishopSvg} alt='white bishop' />,
  WN: <img className={css.icon} src={whiteKnightSvg} alt='white knight' />,
  WQ: <img className={css.icon} src={whiteQueenSvg} alt='white queen' />,
  WK: <img className={css.icon} src={whiteKingSvg} alt='white king' />,
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
      {icon}
    </div>
  );
}
