import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from './TicTacToe';

describe('TicTacToe', () => {
  it('displays a 3 x 3 Tic Tac Toe board', () => {
    render(<TicTacToe />);
    const cells = screen.getAllByRole('button');
    expect(cells).toHaveLength(9);
  });

  it('places a chess piece upon clicking a cell', () => {
    render(<TicTacToe />);

    const firstCell = screen.getAllByRole('button')[0];
    const secondCell = screen.getAllByRole('button')[1];
    fireEvent.click(firstCell);

    expect(firstCell).toHaveTextContent('O');
    expect(secondCell).not.toHaveTextContent('O');
  });
});
