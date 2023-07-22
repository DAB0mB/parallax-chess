import { createContext, useContext, useMemo, useState } from 'react';
import { useValue } from '../events/hooks';
import { getCheckerKey } from '../game/board';
import { Game } from '../game/game';
import { Piece } from '../game/piece/piece';
import { Position } from '../game/types';
import { useCaller } from '../utils/hooks';
import { WinnerMessage } from './winner_message';

export const GameContext = createContext<Game | null>(null);

export const useGame = () => {
  const game = useContext(GameContext);
  if (!game) {
    throw new Error('Game was not provided');
  }

  return game;
};

const createGame = () => new Game();

export function GameUI() {
  const [game, setGame] = useState(createGame);

  const restartGame = useCaller(() => {
    setGame(createGame);
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: '3rem', perspective: '1000px' }}>
        <GameContext.Provider value={game}>
          <BoardUI />
        </GameContext.Provider>
      </div>
      <WinnerMessage game={game} restartGame={restartGame} />
    </div>
  );
}

export function BoardUI() {
  const game = useGame();

  return (
    <div style={{ position: 'relative', width: '8em', height: '8em', transform: 'rotateX(30deg)', transformStyle: 'preserve-3d' }}>
      {(
        game.board.flatMap((row, i) =>
          row.map((_piece, j) =>
            <Checker key={getCheckerKey(i, j)} row={i} col={j} />
          )
        )
      )}
      {(
        game.board.flatMap((row, i) =>
          row.map((piece, j) =>
            piece ? <PieceUI key={getCheckerKey(i, j)} piece={piece} /> : null
          )
        )
      )}
      <Selection />
    </div>
  )
}

const selectionBorderSize = '3px';

export function Selection() {
  const game = useGame();
  const piece = useValue(game.board.selected);

  return useMemo(() => {
    if (!piece) return null;

    const renderMove = ([row, col]: Position) => {
      const onClick = () => {
        piece.move([row, col]);
      };

      return (
        <div key={`${row},${col}`} role='button' style={{ position: 'absolute', left: `calc(${col}em - ${selectionBorderSize})`, top: `calc(${row}em - ${selectionBorderSize})`, width: '1em', height: '1em', cursor: 'pointer', border: `${selectionBorderSize} solid green` }} onClick={onClick} />
      )
    };

    return piece.availableMoves.map(renderMove);
  }, [piece]);
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
    <div role='button' style={{ position: 'absolute', background: color, left: `${props.col}em`, top: `${props.row}em`, width: '1em', height: '1em' }} onClick={onClick} />
  );
}

export const PieceIcons = {
  BP: <><div>♟</div></>,
  BR: <><div>♜</div></>,
  BB: <><div>♝</div></>,
  BN: <><div>♞</div></>,
  BQ: <><div>♛</div></>,
  BK: <><div>♚</div></>,
  WP: <><div style={{ position: 'absolute', color: 'white' }}>♟</div><div style={{ position: 'absolute', color: 'black' }}>♙</div></>,
  WR: <><div style={{ position: 'absolute', color: 'white' }}>♜</div><div style={{ position: 'absolute', color: 'black' }}>♖</div></>,
  WB: <><div style={{ position: 'absolute', color: 'white' }}>♝</div><div style={{ position: 'absolute', color: 'black' }}>♗</div></>,
  WN: <><div style={{ position: 'absolute', color: 'white' }}>♞</div><div style={{ position: 'absolute', color: 'black' }}>♘</div></>,
  WQ: <><div style={{ position: 'absolute', color: 'white' }}>♛</div><div style={{ position: 'absolute', color: 'black' }}>♕</div></>,
  WK: <><div style={{ position: 'absolute', color: 'white' }}>♚</div><div style={{ position: 'absolute', color: 'black' }}>♔</div></>,
} as const;

export function PieceUI(props: { piece: Piece }) {
  const game = useGame();
  const icon = PieceIcons[props.piece.toString() as keyof typeof PieceIcons];
  const deleted = useValue(props.piece.deleted);
  const [row, col] = useValue(props.piece.moved);

  const onClick = useCaller(() => {
    if (game.currentPlayer.value === props.piece.player) {
      props.piece.select();
    }
    else {
      game.board.unselect();
    }
  });

  if (deleted) return null;

  return (
    <div role='button' style={{ transform: 'rotateX(-30deg)', transformOrigin: 'bottom', position: 'absolute', left: `${col}em`, top: `${row}em`, width: '1em', height: '1em', cursor: 'pointer', userSelect: 'none' }} onClick={onClick}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        {icon}
      </div>
    </div>
  );
}
