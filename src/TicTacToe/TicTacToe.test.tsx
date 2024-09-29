import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from './TicTacToe';

describe('TicTacToe - basic capabilties', () => {
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
});

describe('TicTacToe - gameplay', () => {
  it('takes turn placing X and then O in standard mode', () => {
    render(<TicTacToe />);

    for (let i = 0; i < 6; i++) {
      fireEvent.click(screen.getAllByRole('button')[i]);
    }

    const gameState = screen
      .getAllByRole('button')
      .map((button) => button.innerHTML)
      .join('')
      .trimEnd();

    expect(gameState).toStrictEqual('XOXOXO');
  });

  it('allows all players to play either X or O in wild mode', () => {
    render(<TicTacToe wildMode={true} />);

    for (let i = 0; i < 2; i++) {
      fireEvent.click(screen.getAllByRole('button')[i]);
    }

    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('button')[1]);
    fireEvent.change(screen.getByDisplayValue('X'), { target: { value: 'O' } });

    fireEvent.click(screen.getAllByRole('button')[2]);
    fireEvent.click(screen.getAllByRole('button')[3]);
    fireEvent.change(screen.getByDisplayValue('O'), { target: { value: 'X' } });

    fireEvent.click(screen.getAllByRole('button')[4]);
    fireEvent.click(screen.getAllByRole('button')[5]);

    const gameState = screen
      .getAllByRole('button')
      .map((button) => button.innerHTML)
      .join('')
      .trimEnd();

    expect(gameState).toStrictEqual('XXOOXX');
  });

  it('enables player 1 to win the game', () => {
    render(<TicTacToe />);

    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('button')[1]);
    fireEvent.click(screen.getAllByRole('button')[4]);
    fireEvent.click(screen.getAllByRole('button')[2]);
    fireEvent.click(screen.getAllByRole('button')[8]);

    expect(screen.getByText('Player 1 wins!')).toBeVisible();
  });

  it('enables player 2 to win the game', () => {
    render(<TicTacToe />);

    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('button')[1]);
    fireEvent.click(screen.getAllByRole('button')[2]);
    fireEvent.click(screen.getAllByRole('button')[4]);
    fireEvent.click(screen.getAllByRole('button')[8]);
    fireEvent.click(screen.getAllByRole('button')[7]);

    expect(screen.getByText('Player 2 wins!')).toBeVisible();
  });

  it('enables draw between both players', () => {
    render(<TicTacToe />);

    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getAllByRole('button')[i]);
    }

    for (let i = 8; i >= 5; i--) {
      fireEvent.click(screen.getAllByRole('button')[i]);
    }

    expect(screen.getByText('Draw!')).toBeVisible();
  });
});

describe('TicTacToe - with computer player', () => {
  it('can block a player move horizontally', () => {
    render(<TicTacToe computerIsPlayer2 />);

    fireEvent.click(screen.getAllByRole('button')[6]);
    fireEvent.click(screen.getAllByRole('button')[7]);

    const gameState = screen.getAllByRole('button');
    expect(gameState[8].innerHTML).toStrictEqual('O');
  });

  it('can block a player move vertically', () => {
    render(<TicTacToe computerIsPlayer2 />);

    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('button')[3]);

    const gameState = screen.getAllByRole('button');
    expect(gameState[6].innerHTML).toStrictEqual('O');
  });

  it('can block a player move diagonally', () => {
    render(<TicTacToe computerIsPlayer2 />);

    fireEvent.click(screen.getAllByRole('button')[4]);
    fireEvent.click(screen.getAllByRole('button')[6]);

    const gameState = screen.getAllByRole('button');
    expect(gameState[2].innerHTML).toStrictEqual('O');
  });

  it('can play a winning move horizontally', () => {
    render(<TicTacToe computerIsPlayer2 />);

    fireEvent.click(screen.getAllByRole('button')[3]);
    fireEvent.click(screen.getAllByRole('button')[6]);
    fireEvent.click(screen.getAllByRole('button')[7]);

    expect(screen.getByText(/wins!/)).toBeVisible();
  });

  it('can play a winning move vertically', () => {
    render(<TicTacToe computerIsPlayer2 />);

    fireEvent.click(screen.getAllByRole('button')[1]);
    fireEvent.click(screen.getAllByRole('button')[2]);
    fireEvent.click(screen.getAllByRole('button')[5]);

    expect(screen.getByText(/wins!/)).toBeVisible();
  });

  it('can play a winning move diagonally', () => {
    render(<TicTacToe computerIsPlayer2 />);

    fireEvent.click(screen.getAllByRole('button')[1]);
    fireEvent.click(screen.getAllByRole('button')[7]);
    fireEvent.click(screen.getAllByRole('button')[6]);

    expect(screen.getByText(/wins!/)).toBeVisible();
  });
});
