import { useValue } from '@/events/hooks';
import { Position } from '@/game/types';
import { useCaller } from '@/utils/hooks';
import { withVars } from '@/utils/style';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useGame } from './game_context';
import css from './selection.module.css';

export function Selection() {
  const game = useGame();
  const piece = useValue(game.board.selected);

  const unselect = useCaller(() => {
    game.board.unselect();
  });

  return useMemo(() => {
    if (!piece) return null;

    const renderMove = ([row, col]: Position) => {
      const move = () => {
        piece.move([row, col]);
      };

      return (
        <div key={`${row},${col}`} className={css.availableMove} role='button' style={withVars({ row: `${row}em`, col: `${col}em` })} onClick={move} />
      )
    };

    return (
      <>
        {piece.availableMoves.map(renderMove)}
        <div role='button' onClick={unselect} className={classNames(css.availableMove, css.selectedPiece)} style={withVars({ row: `${piece.position[0]}em`, col: `${piece.position[1]}em` })} />
      </>
    );
  }, [piece]);
}
