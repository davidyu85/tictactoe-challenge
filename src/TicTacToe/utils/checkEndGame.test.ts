import { describe, it, expect } from 'vitest';
import checkEndGame from './checkEndGame';
import { TicTacToeGameState } from '../types';

describe('checkEndGame', () => {
  it('returns isPlayerWins when the horizontal winning outcome is found', () => {
    const gameState = 'XXX'.split('') as TicTacToeGameState;
    const result = checkEndGame(gameState, false);
    expect(result).toEqual({ isPlayerWins: true });
  });

  it('returns isPlayerWins when the vertical winning outcome is found', () => {
    const gameState = 'OXOOXOO'.split('') as TicTacToeGameState;
    const result = checkEndGame(gameState, false);
    expect(result).toEqual({ isPlayerWins: true });
  });

  it('returns isPlayerWins when the diagonal winning outcome is found', () => {
    const gameState = '00X0X0X'.split('') as TicTacToeGameState;
    const result = checkEndGame(gameState, false);
    expect(result).toEqual({ isPlayerWins: true });
  });

  it('returns isDraw when the board is full and no winning outcome', () => {
    const gameState = 'XOXOXXOXO'.split('') as TicTacToeGameState;
    const result = checkEndGame(gameState, false);
    expect(result).toEqual({ isDraw: true });
  });

  it('toggles isPlayerTwoTurn when the game is continuing', () => {
    const gameState = Array(9).fill(null);
    gameState[0] = 'X';
    const result = checkEndGame(gameState, false);
    expect(result).toEqual({ isPlayerTwoTurn: true });

    gameState[1] = 'O';
    const result2 = checkEndGame(gameState, true);
    expect(result2).toEqual({ isPlayerTwoTurn: false });
  });
});
