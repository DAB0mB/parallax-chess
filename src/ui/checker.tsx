import { useValue } from '@/events/hooks';
import { useCaller } from '@/utils/hooks';
import classNames from 'classnames';
import css from './checker.module.css';
import { useGame } from './game_context';

export function Checker(props: { row: number, col: number }) {
  const game = useGame();
  const winner = useValue(game.winner);
  const rowOdd = props.row % 2;
  const colOdd = props.col % 2;
  const color = rowOdd
    ? colOdd ? css.checkerLight : css.checkerDark
    : colOdd ? css.checkerDark : css.checkerLight;

  const onClick = useCaller(() => {
    if (winner) return;

    const piece = game.board[props.row][props.col];

    if (piece && piece.color === game.currentPlayer.value.color) {
      game.board.select(piece);
    }
    else {
      game.board.unselect();
    }
  });

  return (
    <div className={classNames(css.checker, color)} role='button' style={{ left: `${props.col}em`, top: `${props.row}em` }} onClick={onClick} />
  );
}
