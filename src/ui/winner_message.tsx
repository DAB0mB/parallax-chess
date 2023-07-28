import { Color } from '@/game/types';
import { useLocale } from '@/locale';
import { withVars } from '@/utils/style';
import css from './winner_message.module.css';

export type WinnerMessageProps = {
  winnerColor: Color,
};

export function WinnerMessage(props: WinnerMessageProps) {
  const l = useLocale();

  const [message, color] = props.winnerColor === Color.WHITE ?
    [l['you win'], 'var(--blackPiece)'] :
    [l['you loose'], 'var(--whitePiece)'];

  return (
    <div className={css.winnerMessage} style={withVars({ color })}>
      {message}
    </div>
  );
}
