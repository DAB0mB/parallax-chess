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
  const { piece, unselect } = useSelectionState();

  return useMemo(() => {
    if (!piece) return null;

    const renderMove = ([row, col]: Position) => {
      const move = () => {
        piece.move([row, col]);
      };

      return (
        <div key={`${row},${col}`} className={css.availableMove} role='button' style={withVars({ row: `${row}em`, col: `${col}em` })} onClick={move} />
      )
    };

    return (
      <>
        {piece.availableMoves.map(renderMove)}
        <div role='button' onClick={unselect} className={classNames(css.availableMove, css.selectedPiece)} style={withVars({ row: `${piece.position[0]}em`, col: `${piece.position[1]}em` })} />
      </>
    );
  }, [piece]);
}

export function Selection3D() {
  const { piece, unselect } = useSelectionState();
  const theme = useTheme();

  return useMemo(() => {
    if (!piece) return null;

    const renderMove = ([row, col]: Position) => {
      const move = () => {
        piece.move([row, col]);
      };

      return (
        <SelectionMesh key={`${row},${col}`} color={theme.availableMove} position={[col - 3.5, 0, row - 3.5]} rotation={[-Math.PI / 2, 0, 0]} onClick={move} />
      );
    };

    return (
      <>
        {piece.availableMoves.map(renderMove)}
        <SelectionMesh color={theme.selectedPiece} position={[piece.position[1] - 3.5, 0, piece.position[0] - 3.5]} rotation={[-Math.PI / 2, 0, 0]} onClick={unselect} />
      </>
    );
  }, [piece, theme]);
}

function useSelectionState() {
  const game = useGame();
  const piece = useValue(game.board.selected);

  const unselect = useCaller(() => {
    game.board.unselect();
  });

  return {
    game,
    piece,
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
