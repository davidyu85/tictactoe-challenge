import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GameEnds from './GameEnds';
import {
  DRAW_STRING,
  SINGLE_PLAYER_WIN_STRING,
  TWO_PLAYER_WIN_STRING,
} from '../constants';

describe('GameEnds', () => {
  it('declares player 1 wins', () => {
    render(
      <GameEnds
        computerIsPlayer2={false}
        isPlayerTwoTurn={false}
        isPlayerWins={true}
        isDraw={false}
      />
    );
    expect(screen.getByRole('heading')).toHaveTextContent(
      TWO_PLAYER_WIN_STRING[1]
    );
  });

  it('declares player 2 wins', () => {
    render(
      <GameEnds
        computerIsPlayer2={false}
        isPlayerTwoTurn={true}
        isPlayerWins={true}
        isDraw={false}
      />
    );
    expect(screen.getByRole('heading')).toHaveTextContent(
      TWO_PLAYER_WIN_STRING[2]
    );
  });

  it('declares player wins in single player mode', () => {
    render(
      <GameEnds
        computerIsPlayer2={true}
        isPlayerTwoTurn={false}
        isPlayerWins={true}
        isDraw={false}
      />
    );
    expect(screen.getByRole('heading')).toHaveTextContent(
      SINGLE_PLAYER_WIN_STRING[1]
    );
  });

  it('declares player 2 wins', () => {
    render(
      <GameEnds
        computerIsPlayer2={false}
        isPlayerTwoTurn={true}
        isPlayerWins={true}
        isDraw={false}
      />
    );
    expect(screen.getByRole('heading')).toHaveTextContent(
      TWO_PLAYER_WIN_STRING[2]
    );
  });

  it('declares draw', () => {
    render(
      <GameEnds
        computerIsPlayer2={false}
        isPlayerTwoTurn={false}
        isPlayerWins={false}
        isDraw={true}
      />
    );
    expect(screen.getByRole('heading')).toHaveTextContent(DRAW_STRING);
  });

  it('hides the component when it is neither winning nor draw', () => {
    render(
      <GameEnds
        computerIsPlayer2={false}
        isPlayerTwoTurn={false}
        isPlayerWins={false}
        isDraw={false}
      />
    );
    expect(screen.queryByRole('heading')).toBeNull();
  });
});
