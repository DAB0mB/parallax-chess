import chessPiecesObj from '@/assets/chess_pieces.obj?url';
import { noopEvent } from '@/events';
import { useEvent, useValue } from '@/events/hooks';
import { Pawn } from '@/game/piece/pawn';
import { Piece as PieceState } from '@/game/piece/piece';
import { Color } from '@/game/types';
import { useTheme } from '@/theme';
import { withVars } from '@/utils/style';
import { useMemo } from 'react';
import { BufferGeometry, Group, Mesh, Vector3Tuple } from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import css from './piece.module.css';

export type PieceProps = {
  piece: PieceState,
};

export function Piece(props: PieceProps) {
  const { deleted, row, col } = usePieceState(props);
  const svg = usePieceSvg(props.piece);
  if (deleted) return null;

  return (
    <div className={css.piece} role='button' style={withVars({ col: `${col}em`, row: `${row}em` })}>
      <div className={css.icon} dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}

import.meta.url;

export function Piece3D(props: PieceProps) {
  const { deleted, row, col } = usePieceState(props);
  const geometry = usePieceGeometry(props.piece);
  const theme = useTheme();
  if (deleted) return null;

  const [color, rotation]: [string, Vector3Tuple] = props.piece.color === Color.WHITE ?
    [theme.whitePiece3D, [0, 0, 0]] :
    [theme.blackPiece3D, [0, Math.PI, 0]];

  return (
    <mesh position={[col - 3.5, 0, row - 3.5]} rotation={rotation}>
      <primitive object={geometry} />
      <meshMatcapMaterial color={color} />
    </mesh>
  );
}

function usePieceState(props: PieceProps) {
  const deleted = useValue(props.piece.deleted);
  const [row, col] = useValue(props.piece.moved);

  useEvent(props.piece instanceof Pawn ? props.piece.upgraded : noopEvent)

  return {
    deleted,
    row,
    col,
  };
}

let piecesSvgBuffer: typeof import('@/bundles/chess_pieces');

function usePieceSvg(piece: PieceState) {
  if (!piecesSvgBuffer) {
    throw import('@/bundles/chess_pieces').then((buffer) => {
      piecesSvgBuffer = buffer;
    });
  }

  const svg = piecesSvgBuffer[piece.toString() as keyof typeof piecesSvgBuffer];
  if (typeof svg != 'string') throw new Error(`Piece svg "${piece.toString()}" not found`);

  return svg;
}

let piecesObjBuffer: Group;

function usePieceGeometry(piece: PieceState) {
  if (!piecesObjBuffer) {
    const loader = new OBJLoader();
    throw loader.loadAsync(chessPiecesObj).then((buffer) => {
      piecesObjBuffer = buffer;
    });
  }

  const model = useMemo(() => piecesObjBuffer.getObjectByName(piece.symbol), [piece]);
  if (!(model instanceof Mesh)) throw new Error(`Piece model "${piece.symbol}" not found`);

  return model.geometry as BufferGeometry;
}
