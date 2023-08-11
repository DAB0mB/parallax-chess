import { useListener, useValue } from '@/events/hooks';
import { Game as GameState } from '@/game/game';
import { Color } from '@/game/types';
import { ThemeContext, dark, light, useThemeCssVars } from '@/theme';
import { useState } from 'react';
import css from './app.module.css';
import { AppContext, App as AppState, RenderMode } from './app_context';
import { FnBar } from './fn_bar';
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
      <AppContext.Provider value={app}>
        <ThemeContext.Provider value={theme}>
          <GameContext.Provider value={game}>
            <div className={css.game} style={{ display: renderMode === RenderMode['2D'] ? undefined : 'none' }}>
              <Game />
            </div>
            <div className={css.game} style={{ visibility: renderMode === RenderMode['3D'] ? undefined : 'hidden' }}>
              <Game3D />
            </div>
          </GameContext.Provider>
          <FnBar />
        </ThemeContext.Provider>
      </AppContext.Provider>
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