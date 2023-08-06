import { useListener } from '@/events/hooks';
import { Game as GameEngine } from '@/game/game';
import { Color } from '@/game/types';
import { ThemeContext, dark, light, useThemeCssVars } from '@/theme';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Board, Board3D } from './board';
import { Footer } from './footer';
import css from './game.module.css';
import { GameContext } from './game_context';
import { MapControls } from './map_controls';
import { Player } from './player';

export function Game() {
  const { game, theme, themeCssVars } = useGameState();

  return (
    <div className={css.game} style={themeCssVars}>
      <div className={css.gameBody}>
        <ThemeContext.Provider value={theme}>
          <GameContext.Provider value={game}>
            <div className={css.blackPlayer}>
              <Player player={game.blackPlayer} />
            </div>
            <div className={css.gameBoard}>
              <Board />
            </div>
            <div className={css.whitePlayer}>
              <Player player={game.whitePlayer} />
            </div>
            <Footer />
          </GameContext.Provider>
        </ThemeContext.Provider>
      </div>
    </div>
  );
}

export function Game3D() {
  const { game, theme, themeCssVars } = useGameState();

  return (
    <div className={css.game} style={themeCssVars}>
      <div className={css.gameBody}>
        <ThemeContext.Provider value={theme}>
          <GameContext.Provider value={game}>
            <Canvas camera={{position: [-7, 7, 7]}}>
              <ambientLight />
              <MapControls />
              <Suspense fallback={null}>
                <Board3D />
              </Suspense>
            </Canvas>
            <Footer />
          </GameContext.Provider>
        </ThemeContext.Provider>
      </div>
    </div>
  );
}

function useGameState() {
  const [game] = useState(() => new GameEngine());
  const [theme, setTheme] = useState(() => getTheme(game));
  const themeCssVars = useThemeCssVars(theme);

  useListener(game.currentPlayer, () => {
    setTheme(getTheme(game));
  });

  return {
    game,
    theme,
    themeCssVars,
  };
}

function getTheme(game: GameEngine) {
  const currentPlayer = game.currentPlayer.value;

  if (currentPlayer) {
    return currentPlayer.color === Color.WHITE ? light : dark;
  }

  return light;
}
