import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from '../TicTacToe';
import { SINGLE_PLAYER_WIN_STRING } from '../constants';
import { renderGameStateSnapShot } from '../../../vitest.setup';

describe('Play with computer - wild mode', () => {
  beforeEach(() => {
    render(<TicTacToe computerIsPlayer2 wildMode />);
  });

  afterEach(() => {
    renderGameStateSnapShot();
  });

  it('can steal winning move from the player horizontally', () => {
    fireEvent.click(screen.getAllByRole('button')[1]);
    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(screen.getByText(SINGLE_PLAYER_WIN_STRING[2])).toBeVisible();
  });

  it('can steal winning move from the player vertically', () => {
    fireEvent.click(screen.getAllByRole('button')[3]);
    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(screen.getByText(SINGLE_PLAYER_WIN_STRING[2])).toBeVisible();
  });

  it('can steal winning move from the player diagonally', () => {
    fireEvent.click(screen.getAllByRole('button')[8]);
    fireEvent.click(screen.getAllByRole('button')[4]);

    expect(screen.getByText(SINGLE_PLAYER_WIN_STRING[2])).toBeVisible();
  });

  it('can steal winning move from the player horizontally when player switch the chess piece', () => {
    fireEvent.change(screen.getByDisplayValue('X'), { target: { value: 'O' } });
    fireEvent.click(screen.getAllByRole('button')[8]);
    fireEvent.click(screen.getAllByRole('button')[7]);

    expect(screen.getByText(SINGLE_PLAYER_WIN_STRING[2])).toBeVisible();
  });

  it('can steal winning move from the player vertically when player switch the chess piece', () => {
    fireEvent.change(screen.getByDisplayValue('X'), { target: { value: 'O' } });
    fireEvent.click(screen.getAllByRole('button')[4]);
    fireEvent.click(screen.getAllByRole('button')[7]);

    expect(screen.getByText(SINGLE_PLAYER_WIN_STRING[2])).toBeVisible();
  });

  it('can steal winning move from the player diagonally when player switch the chess piece', () => {
    fireEvent.change(screen.getByDisplayValue('X'), { target: { value: 'O' } });
    fireEvent.click(screen.getAllByRole('button')[4]);
    fireEvent.click(screen.getAllByRole('button')[6]);

    expect(screen.getByText(SINGLE_PLAYER_WIN_STRING[2])).toBeVisible();
  });
});
