import { createContext, useContext } from 'react';
import { Game } from '../game/game';

export const GameContext = createContext<Game | null>(null);

export const useGame = () => {
  const game = useContext(GameContext);
  if (!game) {
    throw new Error('Game was not provided');
  }

  return game;
};
