import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from '../TicTacToe';
import { TWO_PLAYER_WIN_STRING, DRAW_STRING } from '../constants';
import { renderGameStateSnapShot } from '../../../vitest.setup';

describe('Play between two players - wild', () => {
  beforeEach(() => {
    render(<TicTacToe wildMode={true} />);
  });

  afterEach(() => {
    renderGameStateSnapShot();
  });

  it('allows all players to play either X or O in wild mode', () => {
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

  it('enables player 1 to win the wild mode game', () => {
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('button')[1]);
    fireEvent.click(screen.getAllByRole('button')[2]);

    expect(screen.getByText(TWO_PLAYER_WIN_STRING[1])).toBeVisible();
  });

  it('enables player 2 to win the wild mode game', () => {
    fireEvent.click(screen.getAllByRole('button')[2]);

    fireEvent.change(screen.getByDisplayValue('X'), { target: { value: 'O' } });
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('button')[4]);
    fireEvent.click(screen.getAllByRole('button')[8]);

    expect(screen.getByText(TWO_PLAYER_WIN_STRING[2])).toBeVisible();
  });

  it('enables draw in wild mode', () => {
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('button')[1]);

    fireEvent.change(screen.getByDisplayValue('X'), { target: { value: 'O' } });
    fireEvent.click(screen.getAllByRole('button')[2]);
    fireEvent.click(screen.getAllByRole('button')[3]);
    fireEvent.click(screen.getAllByRole('button')[4]);

    fireEvent.change(screen.getByDisplayValue('O'), { target: { value: 'X' } });
    fireEvent.click(screen.getAllByRole('button')[5]);
    fireEvent.click(screen.getAllByRole('button')[6]);
    fireEvent.click(screen.getAllByRole('button')[7]);

    fireEvent.change(screen.getByDisplayValue('X'), { target: { value: 'O' } });
    fireEvent.click(screen.getAllByRole('button')[8]);

    expect(screen.getByText(DRAW_STRING)).toBeVisible();
  });
});
