import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from '../TicTacToe';
import { DRAW_STRING, TWO_PLAYER_WIN_STRING } from '../constants';
import { renderGameStateSnapShot } from '../../../vitest.setup';

describe('Play between two players - standard', () => {
  beforeEach(() => {
    render(<TicTacToe />);
  });

  afterEach(() => {
    renderGameStateSnapShot();
  });

  it('takes turn placing X and then O in standard mode', () => {
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

  it('enables player 1 to win the game', () => {
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('button')[1]);
    fireEvent.click(screen.getAllByRole('button')[4]);
    fireEvent.click(screen.getAllByRole('button')[2]);
    fireEvent.click(screen.getAllByRole('button')[8]);

    expect(screen.getByText(TWO_PLAYER_WIN_STRING[1])).toBeVisible();
  });

  it('enables player 2 to win the game', () => {
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('button')[1]);
    fireEvent.click(screen.getAllByRole('button')[2]);
    fireEvent.click(screen.getAllByRole('button')[4]);
    fireEvent.click(screen.getAllByRole('button')[8]);
    fireEvent.click(screen.getAllByRole('button')[7]);

    expect(screen.getByText(TWO_PLAYER_WIN_STRING[2])).toBeVisible();
  });

  it('enables draw between both players', () => {
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getAllByRole('button')[i]);
    }

    for (let i = 8; i >= 5; i--) {
      fireEvent.click(screen.getAllByRole('button')[i]);
    }

    expect(screen.getByText(DRAW_STRING)).toBeVisible();
  });
});
