import { Color } from '@/game/types';
import { useLocale } from '@/locale';
import { useValue } from 'event-ops/react';
import { useGame } from './game_context';
import css from './winner_message.module.css';

export function WinnerMessage() {
  const { winner, message } = useWinnerMessageState();
  if (!winner) return null;

  return (
    <div className={css.winnerMessage}>
      {message}
    </div>
  );
}

export function WinnerMessage3D() {
  const { winner, message } = useWinnerMessageState();
  if (!winner) return null;

  return (
    <div className={css.winnerMessage3D}>
      {message}
    </div>
  );
}

function useWinnerMessageState() {
  const game = useGame();
  const l = useLocale();
  const winner = useValue(game.winner);
  const message = winner?.color === Color.WHITE ? l['you win'] : l['you loose'];

  return { winner, message };
}
