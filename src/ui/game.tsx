import { useListener } from '@/events/hooks';
import { Game as GameEngine } from '@/game/game';
import { Color } from '@/game/types';
import { ThemeContext, dark, light, useThemeCssVars } from '@/theme';
import { useCaller } from '@/utils/hooks';
import { useState } from 'react';
import { Board } from './board';
import css from './game.module.css';
import { GameContext } from './game_context';
import { Player } from './player';
import { WinnerMessage } from './winner_message';

const createGame = () => new GameEngine();

const getTheme = (game: GameEngine) => {
  const currentPlayer = game.currentPlayer.value;

  if (currentPlayer) {
    return currentPlayer.color === Color.WHITE ? light : dark;
  }

  return light;
};

export function Game() {
  const [game, setGame] = useState(createGame);
  const [theme, setTheme] = useState(() => getTheme(game));
  const themeCssVars = useThemeCssVars(theme);

  const restartGame = useCaller(() => {
    setGame(createGame);
  });

  useListener(game.currentPlayer, useCaller(() => {
    setTheme(getTheme(game));
  }));

  return (
    <div className={css.game} style={themeCssVars}>
      <ThemeContext.Provider value={theme}>
        <GameContext.Provider value={game}>
          <div className={css.blackPlayer}>
            <Player player={game.player2} />
          </div>
          <div className={css.gameBoard}>
              <Board />
          </div>
          <div className={css.whitePlayer}>
            <Player player={game.player1} />
          </div>
          <WinnerMessage restartGame={restartGame} />
        </GameContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}
