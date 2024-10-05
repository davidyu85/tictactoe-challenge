import { PropsWithChildren, ReactElement } from 'react';
import './board.css';
import { ChessPiece } from '../types';

interface BoardCellProps {
  chess: ChessPiece | null;
  /** Once a click has happened, a chess piece is placed into the cell and should never listens to any click event until reset */
  onClickOnce: () => void;
  /** Different to the above, the disable state happens during end game or while computer is processing, no human interaction is allowed */
  disabled?: boolean;
}

/**
 * Each cell on the game board is a clickable button
 * until a chess piece is assigned to the cell
 *
 * @param {BoardCellProps} props
 * @returns {ReactElement}
 */
export const BoardCell = ({
  chess,
  onClickOnce,
  disabled,
}: BoardCellProps): ReactElement => (
  <button
    className="board-cell"
    disabled={disabled}
    {...(!chess && { onClick: onClickOnce })}
  >
    {chess ?? ' '}
  </button>
);

/**
 * This gameboard styled with CSS Grid Template. But the amount of grid
 * is defined in its inner child
 *
 * @param {PropsWithChildren} props
 * @returns {ReactElement}
 */
export const GameBoard = ({ children }: PropsWithChildren): ReactElement => (
  <div className="tic-tac-toe-board">{children}</div>
);
