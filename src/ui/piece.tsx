import { noopEvent } from '@/events';
import { useEvent, useValue } from '@/events/hooks';
import { Pawn } from '@/game/piece/pawn';
import { Piece as PieceState } from '@/game/piece/piece';
import { Color } from '@/game/types';
import { useTheme } from '@/theme';
import { withVars } from '@/utils/style';
import ChessPiecesWorker from '@/workers/chess_pieces?worker';
import { useMemo } from 'react';
import { BufferGeometry, Mesh, Object3D, ObjectLoader, Vector3Tuple } from 'three';
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
      <img className={css.icon} src={svg} />
    </div>
  );
}

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

let piecesSvgPromise: Promise<void>;
let piecesSvgBuffer: typeof import('@/bundles/chess_pieces');

function usePieceSvg(piece: PieceState) {
  if (!piecesSvgBuffer) {
    throw piecesSvgPromise ??= import('@/bundles/chess_pieces').then((buffer) => {
      piecesSvgBuffer = buffer;
    });
  }

  const svg = piecesSvgBuffer[piece.toString() as keyof typeof piecesSvgBuffer];
  if (typeof svg != 'string') throw new Error(`Piece svg "${piece.toString()}" not found`);

  return svg;
}

let piecesObjPromise: Promise<void>;
let piecesObjBuffer: Object3D;

function usePieceGeometry(piece: PieceState) {
  if (!piecesObjBuffer) {
    throw piecesObjPromise ??= new Promise<void>((resolve, reject) => {
      const worker = new ChessPiecesWorker();
      const loader = new ObjectLoader();
      worker.onmessage = (message) => {
        piecesObjBuffer = loader.parse(message.data);
        resolve();
      };
      worker.onerror = reject;
    });
  }

  const model = useMemo(() => piecesObjBuffer.getObjectByName(piece.symbol), [piece]);
  if (!(model instanceof Mesh)) throw new Error(`Piece model "${piece.symbol}" not found`);

  return model.geometry as BufferGeometry;
}
