import { useListener } from '@/events/hooks';
import { Game as GameEngine } from '@/game/game';
import { Color } from '@/game/types';
import { ThemeContext, dark, light, useThemeCssVars } from '@/theme';
import { useState } from 'react';
import { Board } from './board';
import css from './game.module.css';
import { GameContext } from './game_context';
import { Player } from './player';

export function Game() {
  const [game] = useState(() => new GameEngine());
  const [theme, setTheme] = useState(() => getTheme(game));
  const themeCssVars = useThemeCssVars(theme);

  useListener(game.currentPlayer, () => {
    setTheme(getTheme(game));
  });

  return (
    <div className={css.game} style={themeCssVars}>
      <div className={css.radialBg}>
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
          </GameContext.Provider>
        </ThemeContext.Provider>
      </div>
    </div>
  );
}

const getTheme = (game: GameEngine) => {
  const currentPlayer = game.currentPlayer.value;

  if (currentPlayer) {
    return currentPlayer.color === Color.WHITE ? light : dark;
  }

  return light;
};
