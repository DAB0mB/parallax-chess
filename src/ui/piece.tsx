import blackBishopSvg from '@/assets/chess_pieces/black_bishop.svg';
import blackKingSvg from '@/assets/chess_pieces/black_king.svg';
import blackKnightSvg from '@/assets/chess_pieces/black_knight.svg';
import blackPawnSvg from '@/assets/chess_pieces/black_pawn.svg';
import blackQueenSvg from '@/assets/chess_pieces/black_queen.svg';
import blackRookSvg from '@/assets/chess_pieces/black_rook.svg';
import chessPiecesObj from '@/assets/chess_pieces/chess_pieces.obj?url';
import whiteBishopSvg from '@/assets/chess_pieces/white_bishop.svg';
import whiteKingSvg from '@/assets/chess_pieces/white_king.svg';
import whiteKnightSvg from '@/assets/chess_pieces/white_knight.svg';
import whitePawnSvg from '@/assets/chess_pieces/white_pawn.svg';
import whiteQueenSvg from '@/assets/chess_pieces/white_queen.svg';
import whiteRookSvg from '@/assets/chess_pieces/white_rook.svg';
import { noopEvent } from '@/events';
import { useEvent, useValue } from '@/events/hooks';
import { Pawn } from '@/game/piece/pawn';
import { Piece as GamePiece } from '@/game/piece/piece';
import { Color } from '@/game/types';
import { useTheme } from '@/theme';
import { withVars } from '@/utils/style';
import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import { BufferGeometry, Group, Mesh, Vector3Tuple } from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import css from './piece.module.css';

export const PieceIcons = {
  BP: URL.createObjectURL(new Blob([blackPawnSvg], { type: 'image/svg+xml' })),
  BR: URL.createObjectURL(new Blob([blackRookSvg], { type: 'image/svg+xml' })),
  BB: URL.createObjectURL(new Blob([blackBishopSvg], { type: 'image/svg+xml' })),
  BN: URL.createObjectURL(new Blob([blackKnightSvg], { type: 'image/svg+xml' })),
  BQ: URL.createObjectURL(new Blob([blackQueenSvg], { type: 'image/svg+xml' })),
  BK: URL.createObjectURL(new Blob([blackKingSvg], { type: 'image/svg+xml' })),
  WP: URL.createObjectURL(new Blob([whitePawnSvg], { type: 'image/svg+xml' })),
  WR: URL.createObjectURL(new Blob([whiteRookSvg], { type: 'image/svg+xml' })),
  WB: URL.createObjectURL(new Blob([whiteBishopSvg], { type: 'image/svg+xml' })),
  WN: URL.createObjectURL(new Blob([whiteKnightSvg], { type: 'image/svg+xml' })),
  WQ: URL.createObjectURL(new Blob([whiteQueenSvg], { type: 'image/svg+xml' })),
  WK: URL.createObjectURL(new Blob([whiteKingSvg], { type: 'image/svg+xml' })),
} as const;

export type PieceProps = {
  piece: GamePiece,
};

export function Piece(props: PieceProps) {
  const { deleted, row, col } = usePieceState(props);
  if (deleted) return null;

  const icon = PieceIcons[props.piece.toString() as keyof typeof PieceIcons];

  return (
    <div className={css.piece} role='button' style={withVars({ col: `${col}em`, row: `${row}em` })}>
      <img className={css.icon} src={icon} />
    </div>
  );
}

export function Piece3D(props: PieceProps) {
  const group: Group = useLoader(OBJLoader, chessPiecesObj);
  const model = useMemo(() => group.getObjectByName(props.piece.symbol), [group, props.piece]);
  if (!(model instanceof Mesh)) throw new Error(`Piece model "${props.piece.symbol}" not found`);

  const geometry: BufferGeometry = model.geometry;
  const theme = useTheme();
  const { deleted, row, col } = usePieceState(props);
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
