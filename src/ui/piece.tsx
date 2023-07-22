import { useValue } from '@/events/hooks';
import { Piece as GamePiece } from '@/game/piece/piece';
import { useCaller } from '@/utils/hooks';
import { withVars } from '@/utils/style';
import { useGame } from './game_context';
import css from './piece.module.css';

export type PieceProps = {
  piece: GamePiece,
};

export const PieceIcons = {
  BP: <><div className={css.blackPiece}>♟</div></>,
  BR: <><div className={css.blackPiece}>♜</div></>,
  BB: <><div className={css.blackPiece}>♝</div></>,
  BN: <><div className={css.blackPiece}>♞</div></>,
  BQ: <><div className={css.blackPiece}>♛</div></>,
  BK: <><div className={css.blackPiece}>♚</div></>,
  WP: <><div className={css.whitePiece}>♟</div><div className={css.pieceStroke}>♙</div></>,
  WR: <><div className={css.whitePiece}>♜</div><div className={css.pieceStroke}>♖</div></>,
  WB: <><div className={css.whitePiece}>♝</div><div className={css.pieceStroke}>♗</div></>,
  WN: <><div className={css.whitePiece}>♞</div><div className={css.pieceStroke}>♘</div></>,
  WQ: <><div className={css.whitePiece}>♛</div><div className={css.pieceStroke}>♕</div></>,
  WK: <><div className={css.whitePiece}>♚</div><div className={css.pieceStroke}>♔</div></>,
} as const;

export function Piece(props: PieceProps) {
  const game = useGame();
  const icon = PieceIcons[props.piece.toString() as keyof typeof PieceIcons];
  const deleted = useValue(props.piece.deleted);
  const [row, col] = useValue(props.piece.moved);

  const onClick = useCaller(() => {
    if (game.currentPlayer.value === props.piece.player) {
      props.piece.select();
    }
  });

  if (deleted) return null;

  return (
    <div className={css.piece} role='button' style={withVars({ col: `${col}em`, row: `${row}em` })} onClick={onClick}>
      <div className={css.icon}>
        {icon}
      </div>
    </div>
  );
}
