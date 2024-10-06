import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from '../TicTacToe';
import { SINGLE_PLAYER_WIN_STRING } from '../constants';
import { renderGameStateSnapShot } from '../../../vitest.setup';

describe('Computer can play first', () => {
  afterEach(() => {
    renderGameStateSnapShot();
  });

  it('can finish a game in standard mode', () => {
    render(<TicTacToe computerIsPlayer={1} />);
    expect(screen.getByRole('button', { name: 'X' })).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button')[1]);
    fireEvent.click(screen.getAllByRole('button')[6]);
    fireEvent.click(screen.getAllByRole('button')[8]);

    expect(screen.getByText(SINGLE_PLAYER_WIN_STRING[2])).toBeVisible();
  });

  it('can finish a game in wild mode', () => {
    render(<TicTacToe computerIsPlayer={1} wildMode />);
    expect(screen.getByRole('button', { name: 'X' })).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue('X'), { target: { value: 'O' } });
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('button')[2]);

    expect(screen.getByText(SINGLE_PLAYER_WIN_STRING[2])).toBeVisible();
  });
});
