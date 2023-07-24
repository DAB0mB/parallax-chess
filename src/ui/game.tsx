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
      <div className={css.blackPlayer}>
        <Player color='black' />
      </div>
      <div className={css.gameBoard}>
        <GameContext.Provider value={game}>
          <Board />
        </GameContext.Provider>
      </div>
      <div className={css.whitePlayer}>
        <Player color='white' />
      </div>
      <WinnerMessage game={game} restartGame={restartGame} />
    </div>
  );
}
