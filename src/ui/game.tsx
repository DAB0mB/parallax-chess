import { Canvas } from '@react-three/fiber';
import { Board, Board3D } from './board';
import css from './game.module.css';
import { useGame } from './game_context';
import { Player } from './player';
import { MapControls } from './three/map_controls';

export function Game() {
  const game = useGame();

  return (
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
  );
}

export function Game3D() {
  return (
    <Canvas camera={{position: [-7, 7, 7]}}>
      <ambientLight />
      <MapControls />
      <Board3D />
    </Canvas>
  );
}
