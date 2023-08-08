import { useListener, useValue } from '@/events/hooks';
import { Game as GameState } from '@/game/game';
import { Color } from '@/game/types';
import { ThemeContext, dark, light, useThemeCssVars } from '@/theme';
import { Suspense, useState } from 'react';
import css from './app.module.css';
import { AppContext, App as AppState, RenderMode } from './app_context';
import { Footer } from './footer';
import { Game, Game3D } from './game';
import { GameContext } from './game_context';

export function App() {
  const [game] = useState(() => new GameState());
  const [app] = useState(() => new AppState());
  const [theme, setTheme] = useState(() => getTheme(game));
  const themeCssVars = useThemeCssVars(theme);
  const renderMode = useValue(app.renderMode);

  useListener(game.currentPlayer, () => {
    setTheme(getTheme(game));
  });

  return (
    <div className={css.app} style={themeCssVars}>
      <div className={css.appContent}>
        <AppContext.Provider value={app}>
          <ThemeContext.Provider value={theme}>
            <Suspense fallback={null}>
              <GameContext.Provider value={game}>
                {renderMode === RenderMode['2D'] ? <Game /> : <Game3D />}
              </GameContext.Provider>
              <Footer />
            </Suspense>
          </ThemeContext.Provider>
        </AppContext.Provider>
      </div>
    </div>
  )
}

function getTheme(game: GameState) {
  const currentPlayer = game.currentPlayer.value;

  if (currentPlayer) {
    return currentPlayer.color === Color.WHITE ? light : dark;
  }

  return light;
}