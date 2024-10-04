import { vi, describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from './TicTacToe';
import { GameplayStates } from './types';

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

    expect(firstCell).toHaveTextContent('X');
    expect(secondCell).not.toHaveTextContent('X');
  });

  it('prevents placing chess piece if a cell is taken', () => {
    render(<TicTacToe />);

    const middleCell = screen.getAllByRole('button')[4];
    fireEvent.click(middleCell);
    fireEvent.click(middleCell);

    expect(middleCell).toHaveTextContent('X');
  });

  it('prevents placing chess piece if the board is disabled', async () => {
    // Mocking the initState to disable the gameboard
    const { initState } = await vi.importActual('./gameplayReducer');
    (initState as GameplayStates).isDraw = true;

    render(<TicTacToe />);

    const middleCell = screen.getAllByRole('button')[4];
    fireEvent.click(middleCell);
    fireEvent.click(middleCell);

    expect(middleCell).toHaveTextContent('');
    expect(middleCell).toBeDisabled();
  });
});
