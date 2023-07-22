import { useValue } from '../events/hooks';
import { Game } from '../game/game';
import css from './winner_message.module.css';

export type WinnerMessageProps = {
  game: Game,
  restartGame: () => void,
};

export function WinnerMessage(props: WinnerMessageProps) {
  const winner = useValue(props.game.winner);

  if (!winner) return null;

  return (
    <div className={css.winnerMessage}>
      <div className={css.overlay}>
        <h1>{`${winner.name} wins`}</h1>
        <h4 className={css.playAgainButton} role='button' onClick={props.restartGame}>Play again?</h4>
      </div>
    </div>
  );
}
