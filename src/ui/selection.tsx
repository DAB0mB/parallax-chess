import { useValue } from '@/events/hooks';
import { Position } from '@/game/types';
import { useMemo } from 'react';
import { useGame } from './game_context';
import css from './selection.module.css';

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
        <div key={`${row},${col}`} className={css.selection} role='button' style={{ left: `calc(${col}em - ${css.borderSize})`, top: `calc(${row}em - ${css.borderSize})` }} onClick={onClick} />
      )
    };

    return piece.availableMoves.map(renderMove);
  }, [piece]);
}
