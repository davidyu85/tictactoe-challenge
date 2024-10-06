import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import {
  SINGLE_PLAYER_STRING,
  TWO_PLAYER_TURN_STRING,
} from './TicTacToe/constants';

describe('App', () => {
  it('can restart Tic Tac Toe game and switch between all modes without crashing', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Single player standard mode'));
    expect(screen.queryByText(SINGLE_PLAYER_STRING[2])).toBeVisible();
    expect(screen.queryByText(TWO_PLAYER_TURN_STRING[1])).toBeNull();
    expect(screen.queryByText(/Standard/)).toBeVisible();
    expect(screen.queryByText(/Wild/)).toBeNull();
    expect(screen.queryByDisplayValue('X')).not.toBeVisible();

    fireEvent.click(screen.getByText('Single player wild mode'));
    expect(screen.queryByText(SINGLE_PLAYER_STRING[2])).toBeVisible();
    expect(screen.queryByText(TWO_PLAYER_TURN_STRING[1])).toBeNull();
    expect(screen.queryByText(/Standard/)).toBeNull();
    expect(screen.queryByText(/Wild/)).toBeVisible();
    expect(screen.queryByDisplayValue('X')).toBeVisible();

    fireEvent.click(screen.getByText('Single player standard mode - AI first'));
    expect(screen.queryByText(SINGLE_PLAYER_STRING[1])).toBeVisible();
    expect(screen.queryByText(TWO_PLAYER_TURN_STRING[1])).toBeNull();
    expect(screen.queryByText(/Standard/)).toBeVisible();
    expect(screen.queryByText(/Wild/)).toBeNull();
    expect(screen.queryByDisplayValue('O')).not.toBeVisible();

    fireEvent.click(screen.getByText('Single player wild mode - AI first'));
    expect(screen.queryByText(SINGLE_PLAYER_STRING[1])).toBeVisible();
    expect(screen.queryByText(TWO_PLAYER_TURN_STRING[1])).toBeNull();
    expect(screen.queryByText(/Standard/)).toBeNull();
    expect(screen.queryByText(/Wild/)).toBeVisible();
    expect(screen.queryByDisplayValue('X')).toBeVisible();

    fireEvent.click(screen.getByText('Two players standard mode'));
    expect(screen.queryByText(SINGLE_PLAYER_STRING[2])).toBeNull();
    expect(screen.queryByText(TWO_PLAYER_TURN_STRING[1])).toBeVisible();
    expect(screen.queryByText(/Standard/)).toBeVisible();
    expect(screen.queryByText(/Wild/)).toBeNull();
    expect(screen.queryByDisplayValue('X')).not.toBeVisible();

    fireEvent.click(screen.getByText('Two players wild mode'));
    expect(screen.queryByText(SINGLE_PLAYER_STRING[2])).toBeNull();
    expect(screen.queryByText(TWO_PLAYER_TURN_STRING[1])).toBeVisible();
    expect(screen.queryByText(/Standard/)).toBeNull();
    expect(screen.queryByText(/Wild/)).toBeVisible();
    expect(screen.queryByDisplayValue('X')).toBeVisible();
  });
});
