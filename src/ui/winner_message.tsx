import { Color } from '@/game/types';
import { useLocale } from '@/locale';
import css from './winner_message.module.css';

export type WinnerMessageProps = {
  winnerColor: Color,
};

export function WinnerMessage(props: WinnerMessageProps) {
  const l = useLocale();
  const message = props.winnerColor === Color.WHITE ? l['you win'] : l['you loose'];

  return (
    <div className={css.winnerMessage}>
      {message}
    </div>
  );
}
