import classNames from 'classnames';
import { useMemo } from 'react';
import { HorizontalAxis, VerticalAxis } from './axis';
import css from './board.module.css';
import { Checker } from './checker';
import { useGame } from './game_context';
import { Piece } from './piece';
import { Selection } from './selection';

export function Board() {
  const { board } = useGame();

  return useMemo(() =>
    <div className={classNames(css.board, css.vAxes)}>
      <HorizontalAxis flip />
      <div className={css.hAxes}>
        <VerticalAxis />
        <div className={css.checkers}>
          {
            Array.from(board).flatMap((row, i) =>
              row.map((_piece, j) =>
                <Checker key={`${i},${j}`} row={i} col={j} />
              )
            )
          }
          {
            board.pieces.map((piece) =>
              <Piece key={piece.position.toString()} piece={piece} />
            )
          }
          <Selection />
        </div>
        <VerticalAxis flip />
      </div>
      <HorizontalAxis />
    </div>
  , [board]);
}
