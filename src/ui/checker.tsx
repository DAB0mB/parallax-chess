import { useCaller } from '@/utils/hooks';
import { useGame } from './game_context';
import css from './checker.module.css';
import classNames from 'classnames';

const dark = css.checkerDark
const light = css.checkerLight;

export function Checker(props: { row: number, col: number }) {
  const game = useGame();
  const rowOdd = props.row % 2;
  const colOdd = props.col % 2;
  const color = rowOdd
    ? colOdd ? light : dark
    : colOdd ? dark : light;

  const onClick = useCaller(() => {
    game.board.unselect();
  });

  return (
    <div className={classNames(css.checker, color)} role='button' style={{ left: `${props.col}em`, top: `${props.row}em` }} onClick={onClick} />
  );
}
