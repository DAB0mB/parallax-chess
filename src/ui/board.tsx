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

const BORDER_SIZE = .2;
const AXIS_WIDTH = .5;

export function Board3D() {
  const { board } = useGame();
  const theme = useTheme();

  return useMemo(() =>
    <group>
      <mesh position={[-AXIS_WIDTH, -.01, -AXIS_WIDTH]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8 + BORDER_SIZE, 8 + BORDER_SIZE]} />
        <meshStandardMaterial color={theme.lightChecker} />
      </mesh>
      <mesh position={[-AXIS_WIDTH, -.02, -AXIS_WIDTH]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9 + BORDER_SIZE, 9 + BORDER_SIZE]} />
        <meshStandardMaterial color={theme.darkChecker} />
      </mesh>
      {Array.from(board).flatMap((row, i) =>
        row.map((_piece, j) =>
          <Checker3D key={`${i},${j}`} row={i} col={j} />
        )
      )}
      <group position={[0, 0, -4 - AXIS_WIDTH / 2 - BORDER_SIZE / 2]}>
        <HorizontalAxis3D />
      </group>
      <group position={[4 + AXIS_WIDTH / 2 + BORDER_SIZE / 2, 0, 0]}>
        <VerticalAxis3D />
      </group>
      <group position={[0, 0, 4 + AXIS_WIDTH / 2 + BORDER_SIZE / 2]}>
        <HorizontalAxis3D flip />
      </group>
      <group position={[-4 - AXIS_WIDTH / 2 - BORDER_SIZE / 2, 0, 0]}>
        <VerticalAxis3D flip />
      </group>
    </group>
  , [board]);
}
