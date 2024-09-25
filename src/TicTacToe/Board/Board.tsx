import { PropsWithChildren } from 'react';
import './board.css';

interface BoardCellProps {
  chess: 'X' | 'O' | null;
  onClickOnce: () => void;
}

export const BoardCell = ({ chess, onClickOnce }: BoardCellProps) => (
  <button className="board-cell" {...(!chess && { onClick: onClickOnce })}>
    {chess ?? ' '}
  </button>
);

export const GameBoard = ({ children }: PropsWithChildren) => (
  <div className="tic-tac-toe-board">{children}</div>
);
