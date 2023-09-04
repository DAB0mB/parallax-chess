import { Player as PlayerState } from '@/game/player';
import { Color } from '@/game/types';
import { withVars } from '@/utils/style';
import { useValue } from 'event-ops/react';
import { useGame } from './game_context';
import css from './player.module.css';
import { WinnerMessage } from './winner_message';

export type PlayerProps = {
  player: PlayerState,
};

export function Player(props: PlayerProps) {
  const game = useGame();
  const winner = useValue(game.winner);
  const currentPlayer = useValue(game.currentPlayer);
  const color = props.player.color === Color.WHITE ? 'var(--whitePiece)' : 'var(--blackPiece)';

  const children = winner && winner !== props.player ?
    <WinnerMessage /> : currentPlayer === props.player ?
    <UserIcon /> : null;

  return (
    <div className={css.player} style={withVars({ color })}>
      {children}
    </div>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 128 128" className={css.icon}>
      <g>
        <path d="M115.1,120v4H12.9v-4c0-15.7,19.9-23.3,42-24.9V94c-9.3-2.8-17.6-9.8-21.7-21.3   c-4.2-1.5-6.6-15.3-5.5-17.1C26.9,49.8,21.4,4.3,64,4l0,0l0,0c42.5,0.2,37.1,45.6,36.2,51.5c1.1,1.8-1.3,15.6-5.5,17.1   c-4,11.5-12.3,18.6-21.6,21.4v1C95.3,96.8,115.1,105.2,115.1,120z" fill="var(--color)" />
      </g>
    </svg>
  );
}
