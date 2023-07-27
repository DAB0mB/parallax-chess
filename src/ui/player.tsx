import { useValue } from '@/events/hooks';
import { Player as GamePlayer } from '@/game/player';
import { Color } from '@/game/types';
import { withVars } from '@/utils/style';
import { useGame } from './game_context';
import css from './player.module.css';

export type PlayerProps = {
  player: GamePlayer,
};

export function Player(props: PlayerProps) {
  const game = useGame();
  const currentPlayer = useValue(game.currentPlayer);
  const color = props.player.color === Color.WHITE ? 'var(--whitePiece)' : 'var(--blackPiece)';
  const visibility = currentPlayer === props.player ? 'inherit' : 'hidden';

  return (
    <div className={css.player} style={withVars({ color, visibility })}>
      <div className={css.stroke}>👤</div>
      <div className={css.icon}>👤</div>
    </div>
  );
}
