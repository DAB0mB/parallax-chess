import { Game as GameEngine } from '@/game/game';
import { useCaller } from '@/utils/hooks';
import { useState } from 'react';
import { Board } from './board';
import css from './game.module.css';
import { GameContext } from './game_context';
import { WinnerMessage } from './winner_message';

const createGame = () => new GameEngine();

export function Game() {
  const [game, setGame] = useState(createGame);

  const restartGame = useCaller(() => {
    setGame(createGame);
  });

  return (
    <div className={css.game}>
      <div className={css.gameBoard}>
        <GameContext.Provider value={game}>
          <Board />
        </GameContext.Provider>
      </div>
      <WinnerMessage game={game} restartGame={restartGame} />
    </div>
  );
}
