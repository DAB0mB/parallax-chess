import { createContext, useContext, useMemo } from 'react';
import { Game } from '../game/game';
import { Piece } from '../game/piece/piece';
import { getCheckerKey } from '../game/board';

export const GameContext = createContext<Game | null>(null);

export const useGame = () => {
  const game = useContext(GameContext);
  if (!game) {
    throw new Error('Game was not provided');
  }

  return game;
};

export function GameUI() {
  const game = useMemo(() => new Game(), []);

  return (
    <div style={{ fontSize: '3rem' }}>
      <GameContext.Provider value={game}>
        <BoardUI />
      </GameContext.Provider>
    </div>
  );
}

export function BoardUI() {
  const game = useGame();

  return (
    <div style={{ position: 'relative', width: '8em', height: '8em' }}>
      <div>
        {(
          game.board.flatMap((row, i) =>
            row.map((piece, j) =>
              <Checker key={getCheckerKey(i, j)} i={i} j={j} />
            )
          )
        )}
      </div>
      <div>
        {(
          game.board.flatMap((row, i) =>
            row.map((piece, j) =>
              piece ? <PieceUI key={getCheckerKey(i, j)} piece={piece} /> : null
            )
          )
        )}
      </div>
    </div>
  )
}

const checkerColor1 = '#d18b47';
const checkerColor2 = '#ffcf9f';

export function Checker(props: { i: number, j: number }) {
  const iOdd = props.i % 2;
  const jOdd = props.j % 2;
  const color = iOdd
    ? jOdd ? checkerColor1 : checkerColor2
    : jOdd ? checkerColor2 : checkerColor1;

  return (
    <div style={{ position: 'absolute', background: color, left: `${props.i}em`, top: `${props.j}em`, width: '1em', height: '1em' }} />
  );
}

export const PieceIcons = {
  BP: '♙',
  BR: '♖',
  BB: '♗',
  BN: '♘',
  BQ: '♕',
  BK: '♔',
  WP: '♟',
  WR: '♜',
  WB: '♝',
  WN: '♞',
  WQ: '♛',
  WK: '♚',
} as const;

export function PieceUI(props: { piece: Piece }) {
  const icon = PieceIcons[props.piece.toString() as keyof typeof PieceIcons];
  const [x, y] = props.piece.position;

  return (
    <div role='button' style={{ display: 'flex', position: 'absolute', left: `${x}em`, top: `${y}em`, width: '1em', height: '1em', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <div>{icon}</div>
    </div>
  );
}
