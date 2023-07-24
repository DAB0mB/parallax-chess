import { withVars } from '@/utils/style';
import css from './player.module.css';

export type PlayerProps = {
  color: string,
};

export function Player(props: PlayerProps) {
  // TODO: Add hand emoji on turn
  return (
    <div className={css.player} style={withVars(props)}>
      <div className={css.stroke}>👤</div>
      <div className={css.icon}>👤</div>
    </div>
  );
}
