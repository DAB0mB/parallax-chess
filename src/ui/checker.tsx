import { useValue } from '@/events/hooks';
import { useTheme } from '@/theme';
import { useCaller } from '@/utils/hooks';
import { withVars } from '@/utils/style';
import classNames from 'classnames';
import css from './checker.module.css';
import { useGame } from './game_context';

export type CheckerProps = {
  row: number,
  col: number,
};

export function Checker(props: CheckerProps) {
  const { rowOdd, colOdd, onClick } = useCheckerState(props);
  const color = rowOdd
    ? colOdd ? css.checkerLight : css.checkerDark
    : colOdd ? css.checkerDark : css.checkerLight;

  return (
    <div className={classNames(css.checker, color)} role='button' style={withVars({ left: `${props.col}em`, top: `${props.row}em` })} onClick={onClick} />
  );
}

export function Checker3D(props: CheckerProps) {
  const { rowOdd, colOdd, onClick } = useCheckerState(props);
  const theme = useTheme();
  const color = rowOdd
    ? colOdd ? theme.lightChecker : theme.darkChecker
    : colOdd ? theme.darkChecker : theme.lightChecker;

  return (
    <mesh position={[props.col - 4, props.row - 4, 0]} onClick={onClick}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function useCheckerState(props: CheckerProps) {
  const game = useGame();
  const winner = useValue(game.winner);
  const rowOdd = props.row % 2;
  const colOdd = props.col % 2;

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

  return {
    rowOdd,
    colOdd,
    onClick,
  };
}
