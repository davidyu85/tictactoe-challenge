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

    expect(firstCell).toHaveTextContent('X');
    expect(secondCell).not.toHaveTextContent('X');
  });

  it('takes turn placing X and then O in standard mode', () => {
    render(<TicTacToe />);

    for (let i = 0; i < 9; i++) {
      fireEvent.click(screen.getAllByRole('button')[i]);
    }

    const gameState = screen
      .getAllByRole('button')
      .map((button) => button.innerHTML)
      .join('');

    expect(gameState).toStrictEqual('XOXOXOXOX');
  });

  it('allows playing either X or O in wild mode', () => {
    render(<TicTacToe wildMode={true} />);

    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getAllByRole('button')[i]);
    }

    fireEvent.change(screen.getByDisplayValue('X'), { target: { value: 'O' } });

    for (let i = 5; i < 9; i++) {
      fireEvent.click(screen.getAllByRole('button')[i]);
    }

    const gameState = screen
      .getAllByRole('button')
      .map((button) => button.innerHTML)
      .join('');

    expect(gameState).toStrictEqual('XXXXXOOOO');
  });
});
