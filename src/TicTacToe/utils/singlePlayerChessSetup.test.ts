import { describe, it, expect } from 'vitest';
import singlePlayerChessSetup from './singlePlayerChessSetup';

describe('singlePlayerChessSetup', () => {
  it('returns wild mode setup', () => {
    const objWithWild = expect.objectContaining({
      chessMap: {
        computer: ['X', 'O'],
        player: ['X', 'O'],
      },
    });

    expect(singlePlayerChessSetup(false, true, 1)).toStrictEqual(objWithWild);
    expect(singlePlayerChessSetup(false, true, 2)).toStrictEqual(objWithWild);
    expect(singlePlayerChessSetup(true, true, 1)).toStrictEqual(objWithWild);
    expect(singlePlayerChessSetup(true, true, 2)).toStrictEqual(objWithWild);
  });

  it('returns computer is first setup', () => {
    const objAiFirst = expect.objectContaining({
      chessMap: {
        computer: ['X'],
        player: ['O'],
      },
    });

    expect(singlePlayerChessSetup(false, false, 1)).toStrictEqual(objAiFirst);
    expect(singlePlayerChessSetup(true, false, 1)).toStrictEqual(objAiFirst);
  });

  it('returns computer is second setup', () => {
    const objAiNext = expect.objectContaining({
      chessMap: {
        computer: ['O'],
        player: ['X'],
      },
    });

    expect(singlePlayerChessSetup(false, false, 2)).toStrictEqual(objAiNext);
    expect(singlePlayerChessSetup(true, false, 2)).toStrictEqual(objAiNext);
  });

  it('returns null if there is no computer player assigned', () => {
    expect(singlePlayerChessSetup(false, false)).toBeNull();
    expect(singlePlayerChessSetup(true, false)).toBeNull();
    expect(singlePlayerChessSetup(false, true)).toBeNull();
    expect(singlePlayerChessSetup(true, true)).toBeNull();
  });

  it('returns the correct turn', () => {
    expect(singlePlayerChessSetup(false, false, 1)).toStrictEqual(
      expect.objectContaining({
        isComputerPlayerTurn: true,
      })
    );
    expect(singlePlayerChessSetup(true, false, 1)).toStrictEqual(
      expect.objectContaining({
        isComputerPlayerTurn: false,
      })
    );
    expect(singlePlayerChessSetup(false, false, 2)).toStrictEqual(
      expect.objectContaining({
        isComputerPlayerTurn: false,
      })
    );
    expect(singlePlayerChessSetup(true, false, 2)).toStrictEqual(
      expect.objectContaining({
        isComputerPlayerTurn: true,
      })
    );
  });
});
