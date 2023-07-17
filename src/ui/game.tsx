import { createContext, useContext, useMemo } from 'react';
import { useValue } from '../events/hooks';
import { getCheckerKey } from '../game/board';
import { Game } from '../game/game';
import { Piece } from '../game/piece/piece';
import { Position } from '../game/types';
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

  return useMemo(() => {
    if (!selectedPiece) return null;

    const renderMove = ([row, col]: Position) => {
      const onClick = () => {
        selectedPiece.move([row, col]);
      };

      return (
        <div key={`${row},${col}`} role='button' style={{ position: 'absolute', left: `calc(${col}em - ${selectionBorderSize})`, top: `calc(${row}em - ${selectionBorderSize})`, width: '1em', height: '1em', cursor: 'pointer', border: `${selectionBorderSize} solid green` }} onClick={onClick} />
      )
    };

    return selectedPiece.availableMoves.map(renderMove);
  }, [selectedPiece]);
}

const checkerColor1 = '#d18b47';
const checkerColor2 = '#ffcf9f';

export function Checker(props: { row: number, col: number }) {
  const game = useGame();
  const rowOdd = props.row % 2;
  const colOdd = props.col % 2;
  const color = rowOdd
    ? colOdd ? checkerColor2 : checkerColor1
    : colOdd ? checkerColor1 : checkerColor2;

  const onClick = useCaller(() => {
    game.board.unselect();
  });

  return (
    <div style={{ position: 'absolute', background: color, left: `${props.col}em`, top: `${props.row}em`, width: '1em', height: '1em' }} onClick={onClick} />
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
  const deleted = useValue(props.piece.deleted);
  const [row, col] = useValue(props.piece.moved);

  const onClick = useCaller(() => {
    props.piece.select();
  });

  if (deleted) return null;

  return (
    <div role='button' style={{ display: 'flex', position: 'absolute', left: `${col}em`, top: `${row}em`, width: '1em', height: '1em', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={onClick}>
      <div>{icon}</div>
    </div>
  );
}
