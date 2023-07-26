import { useValue } from '@/events/hooks';
import { Player as GamePlayer } from '@/game/player';
import { Color } from '@/game/types';
import { withVars } from '@/utils/style';
import { useGame } from './game_context';
import { PieceSymbols } from './piece';
import css from './player.module.css';

export type PlayerProps = {
  player: GamePlayer,
};

export function Player(props: PlayerProps) {
  const game = useGame();
  const selectedPiece = useValue(game.board.selected);
  const currentPlayer = useValue(game.currentPlayer);
  const winner = useValue(game.winner);
  const color = props.player.color === Color.WHITE ? 'white' : 'black';
  const bubbleText = selectedPiece ? PieceSymbols[selectedPiece.toString() as keyof typeof PieceSymbols] : '···';

  return (
    <div className={css.player} style={withVars({ color })}>
      {!winner && currentPlayer === props.player && (
        <div className={css.bubble}>
          <Bubble>
            {bubbleText}
          </Bubble>
        </div>
      )}
      <div className={css.stroke}>👤</div>
      <div className={css.icon}>👤</div>
    </div>
  );
}

type BubbleProps = {
  children: string;
};

function Bubble(props: BubbleProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 128 128"
      xmlSpace="preserve"
    >
      <path
        style={{
          fill: "#FFFFFF",
          stroke: "#000000",
          strokeWidth: 6,
          strokeMiterlimit: 10
        }}
        d="M120.44,51.23c1.9-3.94,2.96-8.35,2.96-13.02  c0-16.6-13.45-30.05-30.05-30.05c-3.89,0-7.61,0.75-11.03,2.1C77.95,6.45,72.22,4.1,66,4.1c-7.6,0-14.4,3.4-18.9,8.7  c-3.5-1.9-7.5-3-11.7-3C22,9.9,11.1,20.7,11.1,34.1c0,5,1.5,9.7,4.2,13.6c-5,4-8.5,9.9-9.2,16.8C4.8,77.9,14.7,90,28.3,91.3  c3.2,0.3,6.2,0,9.1-0.8c1.1,10.7,10.1,19,21.1,19c7,0,13.2-3.4,17-8.6c3.6,2.8,8.1,4.6,13.1,4.6c11,0,20.1-8.5,20.9-19.2  C118,82.4,124,73.8,124,63.8C124,59.21,122.67,54.88,120.44,51.23z"
      />
      <path
        style={{
          fill: "#FFFFFF",
          stroke: "#000000",
          strokeWidth: "4.5",
          strokeMiterlimit: 10
        }}
        d="M24.3,97.3c-4.5-0.5-8.5,2.8-9,7.3  s2.8,8.5,7.3,8.9c4.5,0.5,8.5-2.8,9-7.3C32.1,101.7,28.8,97.7,24.3,97.3z"
      />
      <path
        style={{
          fill: "#FFFFFF",
          stroke: "#000000",
          strokeWidth: "4.5",
          strokeMiterlimit: 10
        }}
        d="M9,114.3c-3-0.3-5.7,1.9-6,4.9  s1.9,5.6,4.9,5.9s5.7-1.9,6-4.9C14.2,117.3,12,114.6,9,114.3z"
      />
      <text
        style={{
          fontWeight: 900,
        }}
        x="66" y="58" fill="#000000" textAnchor="middle" alignmentBaseline="middle"
      >
        {props.children}
      </text>
    </svg>
  );
}
