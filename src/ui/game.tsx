import { createContext, useContext, useMemo } from 'react';
import { useValue } from '../events/hooks';
import { getCheckerKey } from '../game/board';
import { Game } from '../game/game';
import { Piece } from '../game/piece/piece';
import { useCaller } from '../utils/hooks';

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
            row.map((_piece, j) =>
              <Checker key={getCheckerKey(i, j)} row={i} col={j} />
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
      <Selection />
    </div>
  )
}

const selectionBorderSize = '3px';

export function Selection() {
  const game = useGame();
  const selectedPiece = useValue(game.board.selectedPiece);

  if (!selectedPiece) return null;

  return (
    <div>
      {selectedPiece.availableMoves.map(([row, col]) =>
        <div key={`${row},${col}`} style={{ position: 'absolute', left: `calc(${col}em - ${selectionBorderSize})`, top: `calc(${row}em - ${selectionBorderSize})`, width: '1em', height: '1em', border: `${selectionBorderSize} solid green` }} />
      )}
    </div>
  )
}

const checkerColor1 = '#d18b47';
const checkerColor2 = '#ffcf9f';

export function Checker(props: { row: number, col: number }) {
  const rowOdd = props.row % 2;
  const colOdd = props.col % 2;
  const color = rowOdd
    ? colOdd ? checkerColor2 : checkerColor1
    : colOdd ? checkerColor1 : checkerColor2;

  return (
    <div style={{ position: 'absolute', background: color, left: `${props.col}em`, top: `${props.row}em`, width: '1em', height: '1em' }} />
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
  const game = useGame();
  const icon = PieceIcons[props.piece.toString() as keyof typeof PieceIcons];
  const [row, col] = props.piece.position;

  const onClick = useCaller(() => {
    game.board.selectedPiece.value = props.piece;
  });

  return (
    <div role='button' style={{ display: 'flex', position: 'absolute', left: `${col}em`, top: `${row}em`, width: '1em', height: '1em', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={onClick}>
      <div>{icon}</div>
    </div>
  );
}
