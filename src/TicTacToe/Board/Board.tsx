import { PropsWithChildren } from 'react';
import './board.css';

interface BoardCellProps {
  chess: 'X' | 'O' | null;
  onClickOnce: () => void;
  disabled?: boolean;
}

export const BoardCell = ({ chess, onClickOnce, disabled }: BoardCellProps) => (
  <button
    className="board-cell"
    disabled={disabled}
    {...(!chess && { onClick: onClickOnce })}
  >
    {chess ?? ' '}
  </button>
);

export const GameBoard = ({ children }: PropsWithChildren) => (
  <div className="tic-tac-toe-board">{children}</div>
);
