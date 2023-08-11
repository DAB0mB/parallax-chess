import { useTheme } from '@/theme';
import classNames from 'classnames';
import { useMemo } from 'react';
import { HorizontalAxis, HorizontalAxis3D, VerticalAxis, VerticalAxis3D } from './axis';
import css from './board.module.css';
import { Checker, Checker3D } from './checker';
import { useGame } from './game_context';
import { Piece, Piece3D } from './piece';
import { Selection, Selection3D } from './selection';

export function Board() {
  const { board } = useGame();

  return useMemo(() =>
    <div className={classNames(css.board, css.vAxes)}>
      <HorizontalAxis flip />
      <div className={css.hAxes}>
        <VerticalAxis />
        <div className={css.checkers}>
          {Array.from(board).flatMap((row, i) =>
            row.map((_piece, j) =>
              <Checker key={`${i},${j}`} row={i} col={j} />
            )
          )}
          {board.pieces.map((piece) =>
            <Piece key={piece.position.toString()} piece={piece} />
          )}
          <Selection />
        </div>
        <VerticalAxis flip />
      </div>
      <HorizontalAxis />
    </div>
  , [board]);
}

const BORDER_SIZE = .1;
const AXIS_SIZE = .5;
const BORDER_SURFACE = 8 + BORDER_SIZE * 2;
const AXIS_SURFACE = BORDER_SURFACE + AXIS_SIZE * 2;
const AXIS_OFFSET = (AXIS_SURFACE + BORDER_SURFACE) / 4;

export function Board3D() {
  const { board } = useGame();

  return useMemo(() =>
    <group>
      <Surface />
      <group position={[0, .01, 0]}>
        <Selection3D />
      </group>
      {Array.from(board).flatMap((row, i) =>
        row.map((_piece, j) =>
          <Checker3D key={`${i},${j}`} row={i} col={j} />
        )
      )}
      {board.pieces.map((piece) =>
        <Piece3D key={piece.position.toString()} piece={piece} />
      )}
      <group position={[4, 0, AXIS_OFFSET]}>
        <HorizontalAxis3D />
      </group>
      <group position={[-AXIS_OFFSET, 0, .5]}>
        <VerticalAxis3D />
      </group>
      <group position={[-3, 0, -AXIS_OFFSET]}>
        <HorizontalAxis3D flip />
      </group>
      <group position={[AXIS_OFFSET, 0, .5]}>
        <VerticalAxis3D flip />
      </group>
    </group>
  , [board]);
}

function Surface() {
  const theme = useTheme();

  return (
    <group>
      <mesh position={[0, -.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[BORDER_SURFACE, BORDER_SURFACE]} />
        <meshMatcapMaterial color={theme.lightChecker} />
      </mesh>
      <mesh position={[0, -.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[AXIS_SURFACE, AXIS_SURFACE]} />
        <meshMatcapMaterial color={theme.darkChecker} />
      </mesh>
    </group>
  );
}
