import { useValue } from '@/events/hooks';
import { Position } from '@/game/types';
import { useTheme } from '@/theme';
import { useCaller } from '@/utils/hooks';
import { withVars } from '@/utils/style';
import { MeshProps } from '@react-three/fiber';
import classNames from 'classnames';
import { useMemo } from 'react';
import * as THREE from 'three';
import { useGame } from './game_context';
import selectionFragGlsl from './selection.frag.glsl';
import css from './selection.module.css';
import selectionVertGlsl from './selection.vert.glsl';

export function Selection() {
  const { piece, move, unselect } = useSelectionState();

  const availableMovesChildren = useMemo(() => {
    if (!piece) return null;

    return piece.availableMoves.map(([row, col]) =>
      <div key={`${row},${col}`} className={css.availableMove} role='button' style={withVars({ row: `${row}em`, col: `${col}em` })} onClick={() => move([row, col])} />
    );
  }, [piece, move]);

  if (!piece) return null;

  return (
    <>
      {availableMovesChildren}
      <div role='button' onClick={unselect} className={classNames(css.availableMove, css.selectedPiece)} style={withVars({ row: `${piece.position[0]}em`, col: `${piece.position[1]}em` })} />
    </>
  );
}

export function Selection3D() {
  const { piece, move, unselect } = useSelectionState();
  const theme = useTheme();

  const availableMovesChildren = useMemo(() => {
    if (!piece) return null;

    return piece.availableMoves.map(([row, col]) =>
      <SelectionMesh key={`${row},${col}`} color={theme.availableMove} position={[col - 3.5, 0, row - 3.5]} rotation={[-Math.PI / 2, 0, 0]} onClick={() => move([row, col])} />
    );
  }, [piece, move]);

  if (!piece) return null;

  return (
    <>
      {availableMovesChildren}
      <SelectionMesh color={theme.selectedPiece} position={[piece.position[1] - 3.5, 0, piece.position[0] - 3.5]} rotation={[-Math.PI / 2, 0, 0]} onClick={unselect} />
    </>
  );
}

function useSelectionState() {
  const game = useGame();
  const piece = useValue(game.board.selected);

  const move = useCaller((position: Position) => {
    if (piece) {
      piece.move(position);
    }
  });

  const unselect = useCaller(() => {
    game.board.unselect();
  });

  return {
    game,
    piece,
    move,
    unselect,
  };
}

type SelectionMeshProps = MeshProps & {
  color: string,
};

function SelectionMesh(props: SelectionMeshProps) {
  const selectionShader: THREE.ShaderMaterialParameters = useMemo(() => {
    return {
      uniforms: {
        color: { value: new THREE.Color(props.color) },
        borderWidth: { value: 0.02 },
      },
      transparent: true,
      vertexShader: selectionVertGlsl,
      fragmentShader: selectionFragGlsl,
    };
  }, [props.color]);

  return (
    <mesh {...props}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial args={[selectionShader]} />
    </mesh>
  );
}
