import { getCheckerKey } from '@/game/board';
import classNames from 'classnames';
import { HorizontalAxis, VerticalAxis } from './axis';
import css from './board.module.css';
import { Checker } from './checker';
import { useGame } from './game_context';
import { Piece } from './piece';
import { Selection } from './selection';

export function Board() {
  const game = useGame();

  return (
    <div className={classNames(css.board, css.vAxes)}>
      <HorizontalAxis flip />
      <div className={css.hAxes}>
        <VerticalAxis />
        <div className={css.checkers}>
          {(
            game.board.flatMap((row, i) =>
              row.map((_piece, j) =>
                <Checker key={getCheckerKey(i, j)} row={i} col={j} />
              )
            )
          )}
          {(
            game.board.flatMap((row, i) =>
              row.map((piece, j) =>
                piece ? <Piece key={getCheckerKey(i, j)} piece={piece} /> : null
              )
            )
          )}
          <Selection />
        </div>
        <VerticalAxis flip />
      </div>
      <HorizontalAxis />
    </div>
  )
}
