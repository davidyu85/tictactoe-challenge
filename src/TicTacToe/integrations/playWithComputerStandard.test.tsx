import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from '../TicTacToe';
import { SINGLE_PLAYER_WIN_STRING } from '../constants';
import { renderGameStateSnapShot } from '../../../vitest.setup';

describe('Play with computer - standard mode', () => {
  beforeEach(() => {
    render(<TicTacToe computerIsPlayer2 />);
  });

  afterEach(() => {
    renderGameStateSnapShot();
  });

  it('can block a player move horizontally', () => {
    fireEvent.click(screen.getAllByRole('button')[6]);
    fireEvent.click(screen.getAllByRole('button')[7]);
    const board = screen.getAllByRole('button');

    expect(board[8].innerHTML).toStrictEqual('O');
  });

  it('can block a player move vertically', () => {
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('button')[3]);
    const board = screen.getAllByRole('button');

    expect(board[6].innerHTML).toStrictEqual('O');
  });

  it('can block a player move diagonally', () => {
    fireEvent.click(screen.getAllByRole('button')[4]);
    fireEvent.click(screen.getAllByRole('button')[6]);
    const board = screen.getAllByRole('button');

    expect(board[2].innerHTML).toStrictEqual('O');
  });

  it('can play a winning move horizontally', () => {
    fireEvent.click(screen.getAllByRole('button')[3]);
    fireEvent.click(screen.getAllByRole('button')[6]);
    fireEvent.click(screen.getAllByRole('button')[7]);

    expect(screen.getByText(SINGLE_PLAYER_WIN_STRING[2])).toBeVisible();
  });

  it('can play a winning move vertically', () => {
    fireEvent.click(screen.getAllByRole('button')[1]);
    fireEvent.click(screen.getAllByRole('button')[2]);
    fireEvent.click(screen.getAllByRole('button')[5]);

    expect(screen.getByText(SINGLE_PLAYER_WIN_STRING[2])).toBeVisible();
  });

  it('can play a winning move diagonally', () => {
    fireEvent.click(screen.getAllByRole('button')[1]);
    fireEvent.click(screen.getAllByRole('button')[7]);
    fireEvent.click(screen.getAllByRole('button')[6]);

    expect(screen.getByText(SINGLE_PLAYER_WIN_STRING[2])).toBeVisible();
  });
});
