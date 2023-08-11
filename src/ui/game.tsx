import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useLayoutEffect, useRef } from 'react';
import { OrbitControls as ThreeOrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Board, Board3D } from './board';
import css from './game.module.css';
import { useGame } from './game_context';
import { Player } from './player';
import { WinnerMessage3D } from './winner_message';

export function Game() {
  const game = useGame();

  return (
    <Suspense fallback={null}>
      <div className={css.game}>
        <div className={css.blackPlayer}>
          <Player player={game.blackPlayer} />
        </div>
        <div className={css.gameBoard}>
          <Board />
        </div>
        <div className={css.whitePlayer}>
          <Player player={game.whitePlayer} />
        </div>
      </div>
    </Suspense>
  );
}

export function Game3D() {
  return (
    <Suspense fallback={null}>
      <Canvas camera={{position: [-7, 7, 7]}}>
        <OrbitControls />
        <Board3D />
      </Canvas>
      <WinnerMessage3D />
    </Suspense>
  );
}

function OrbitControls() {
  const three = useThree();
  const orbitControlsRef = useRef<ThreeOrbitControls | null>(null);

  useFrame(() => {
    const orbitControls = orbitControlsRef.current;

    if (orbitControls) {
      orbitControls.update();
    }
  });

  useLayoutEffect(() => {
    const orbitControls = new ThreeOrbitControls(three.camera, three.gl.domElement);
    orbitControls.minDistance = 7;
    orbitControls.maxDistance = 16;
    orbitControls.enablePan = false;
    orbitControls.maxPolarAngle = Math.PI / 2;
    orbitControlsRef.current = orbitControls;

    return () => {
      orbitControls.dispose();
      orbitControlsRef.current = null;
    };
  }, [three.camera, three.gl.domElement]);

  return null;
}
