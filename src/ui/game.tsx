import { Game as GameEngine } from '@/game/game';
import { useCaller } from '@/utils/hooks';
import { useState } from 'react';
import { Board } from './board';
import css from './game.module.css';
import { GameContext } from './game_context';
import { WinnerMessage } from './winner_message';
import { useThemeCssVars } from '@/theme';
import { Player } from './player';

const createGame = () => new GameEngine();

export function Game() {
  const [game, setGame] = useState(createGame);
  const themeCssVars = useThemeCssVars();

  const restartGame = useCaller(() => {
    setGame(createGame);
  });

  return (
    <div className={css.game} style={themeCssVars}>
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
    </div>
  );
}
