import { describe, it, expect } from 'vitest';
import miniMax from './miniMax';
import { ChessAccessMap, TicTacToeBoard } from '../types';

describe('miniMax', () => {
  it('give a positive score if computer opponent player wins at terminal state', () => {
    const chessAccess: ChessAccessMap = { computer: ['O'], player: ['X'] };
    const gameState = 'XXOXOXO'.split('') as TicTacToeBoard;
    const score = miniMax(chessAccess, gameState, false, -99, 99);
    expect(score).toEqual(1);
  });

  it('give a negative score if player wins at terminal state', () => {
    const chessAccess: ChessAccessMap = { computer: ['O'], player: ['X'] };
    const gameState = 'XOOXXOX'.split('') as TicTacToeBoard;
    const score = miniMax(chessAccess, gameState, true, -99, 99);
    expect(score).toEqual(-1);
  });

  it('give a 0 if draw happens at terminal state', () => {
    const chessAccess: ChessAccessMap = { computer: ['O'], player: ['X'] };
    const gameState = 'XOXOXXOXO'.split('') as TicTacToeBoard;
    const score = miniMax(chessAccess, gameState, true, -99, 99);
    expect(score).toEqual(0);

    const score2 = miniMax(chessAccess, gameState, false, -99, 99);
    expect(score2).toEqual(0);
  });
});
