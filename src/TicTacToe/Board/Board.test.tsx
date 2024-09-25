import { vi, describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BoardCell, GameBoard } from './Board';

describe('BoardCell', () => {
  it('prevents click if BoardCell has a chess piece', () => {
    const handleClick = vi.fn();
    render(<BoardCell chess="X" onClickOnce={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('response to click if BoardCell is empty', () => {
    const handleClick = vi.fn();
    render(<BoardCell chess={null} onClickOnce={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});

describe('Board', () => {
  it('renders children component inside the GameBoard', () => {
    render(
      <GameBoard>
        <BoardCell chess="O" onClickOnce={vi.fn()} />
      </GameBoard>
    );

    const board = screen.getByRole('button');
    expect(board).toBeInTheDocument();
  });
});
