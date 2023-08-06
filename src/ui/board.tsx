import classNames from 'classnames';
import { useMemo } from 'react';
import { HorizontalAxis, HorizontalAxis3D, VerticalAxis, VerticalAxis3D } from './axis';
import css from './board.module.css';
import { Checker, Checker3D } from './checker';
import { useGame } from './game_context';
import { Piece } from './piece';
import { Selection } from './selection';
import { useTheme } from '@/theme';

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

export function Board3D() {
  const { board } = useGame();
  const theme = useTheme();

  return useMemo(() =>
    <group>
      <mesh position={[-.5, -.01, -.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8.2, 8.2]} />
        <meshStandardMaterial color={theme.lightChecker} />
      </mesh>
      <mesh position={[-.5, -.02, -.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9.2, 9.2]} />
        <meshStandardMaterial color={theme.darkChecker} />
      </mesh>
      {Array.from(board).flatMap((row, i) =>
        row.map((_piece, j) =>
          <Checker3D key={`${i},${j}`} row={i} col={j} />
        )
      )}
      <HorizontalAxis3D />
      <VerticalAxis3D />
      <HorizontalAxis3D flip />
      <VerticalAxis3D flip />
    </group>
  , [board]);
}
