import { describe, it, expect } from 'vitest';
import miniMax from './miniMax';
import { TicTacToeGameState } from '../types';

describe('miniMax', () => {
  it('give a positive score if maximizing player wins at terminal state', () => {
    const gameState = 'XXOXOXO'.split('') as TicTacToeGameState;
    const score = miniMax(true, gameState, 0, false);
    expect(score).toEqual(1);
  });

  it('give a negative score if minimizing player wins at terminal state', () => {
    const gameState = 'XOOXXOX'.split('') as TicTacToeGameState;
    const score = miniMax(false, gameState, 0, true);
    expect(score).toEqual(-1);
  });

  it('give a 0 if draw happens at terminal state', () => {
    const gameState = 'XOXOXXOXO'.split('') as TicTacToeGameState;
    const score = miniMax(false, gameState, 0, true);
    expect(score).toEqual(0);

    const score2 = miniMax(true, gameState, 0, false);
    expect(score2).toEqual(0);
  });
});
