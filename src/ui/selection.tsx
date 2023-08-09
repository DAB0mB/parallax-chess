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

  return useMemo(() => {
    if (!piece) return null;

    const renderMove = ([row, col]: Position) => {
      const move = () => {
        piece.move([row, col]);
      };

      return (
        <SelectionMesh position={[col - 3.5, 0, row - 3.5]} rotation={[-Math.PI / 2, 0, 0]} onClick={move} />
      );
    };

    return (
      <>
        {piece.availableMoves.map(renderMove)}
      </>
    );
  }, [piece]);
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

function SelectionMesh(props: MeshProps) {
  const theme = useTheme();

  const selectionShader: THREE.ShaderMaterialParameters = useMemo(() => {
    return {
      uniforms: {
        borderColor: { value: new THREE.Color(theme.availableMove) },
        borderWidth: { value: 0.01 },
      },
      transparent: true,
      vertexShader: selectionVertGlsl,
      fragmentShader: selectionFragGlsl,
    };
  }, [theme]);

  return (
    <mesh {...props}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial args={[selectionShader]} />
    </mesh>
  );
}
