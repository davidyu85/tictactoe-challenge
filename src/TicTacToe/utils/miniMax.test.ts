import { describe, it, expect } from 'vitest';
import miniMax from './miniMax';
import { ChessAccessMap, TicTacToeGameState } from '../types';

describe('miniMax', () => {
  it('give a positive score if computer opponent player wins at terminal state', () => {
    const chessAccess: ChessAccessMap = { computer: ['O'], player: ['X'] };
    const gameState = 'XXOXOXO'.split('') as TicTacToeGameState;
    const score = miniMax(chessAccess, gameState, 0, false, -99, 99);
    expect(score).toEqual(1);
  });

  it('give a negative score if player wins at terminal state', () => {
    const chessAccess: ChessAccessMap = { computer: ['O'], player: ['X'] };
    const gameState = 'XOOXXOX'.split('') as TicTacToeGameState;
    const score = miniMax(chessAccess, gameState, 0, true, -99, 99);
    expect(score).toEqual(-1);
  });

  it('give a 0 if draw happens at terminal state', () => {
    const chessAccess: ChessAccessMap = { computer: ['O'], player: ['X'] };
    const gameState = 'XOXOXXOXO'.split('') as TicTacToeGameState;
    const score = miniMax(chessAccess, gameState, 0, true, -99, 99);
    expect(score).toEqual(0);

    const score2 = miniMax(chessAccess, gameState, 0, false, -99, 99);
    expect(score2).toEqual(0);
  });
});
