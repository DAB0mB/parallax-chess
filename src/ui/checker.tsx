import { useCaller } from '@/utils/hooks';
import { useGame } from './game_context';
import css from './checker.module.css';
import classNames from 'classnames';

export function Checker(props: { row: number, col: number }) {
  const game = useGame();
  const rowOdd = props.row % 2;
  const colOdd = props.col % 2;
  const color = rowOdd
    ? colOdd ? css.checkerLight : css.checkerDark
    : colOdd ? css.checkerDark : css.checkerLight;

  const onClick = useCaller(() => {
    const piece = game.board[props.row][props.col];

    if (piece && piece.player === game.currentPlayer.value) {
      piece.select();
    }
    else {
      game.board.unselect();
    }
  });

  return (
    <div className={classNames(css.checker, color)} role='button' style={{ left: `${props.col}em`, top: `${props.row}em` }} onClick={onClick} />
  );
}
