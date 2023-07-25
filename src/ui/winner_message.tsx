import { useLocale } from '@/locale';
import { useValue } from '../events/hooks';
import { useGame } from './game_context';
import css from './winner_message.module.css';

export type WinnerMessageProps = {
  restartGame: () => void,
};

export function WinnerMessage(props: WinnerMessageProps) {
  const game = useGame();
  const winner = useValue(game.winner);
  const l = useLocale();

  if (!winner) return null;

  return (
    <div className={css.winnerMessage}>
      <div className={css.overlay}>
        <h1>{l['winner'](winner.name)}</h1>
        <h4 className={css.playAgainButton} role='button' onClick={props.restartGame}>{l['play again']}</h4>
      </div>
    </div>
  );
}
