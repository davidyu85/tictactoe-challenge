import { ChessAccessMap, Players } from '../types';

type SinglePlayerChessSetupReturns = {
  isComputerPlayerTurn: boolean;
  chessMap: ChessAccessMap;
};

/**
 * If is a single player game, it provides whether it is the computer player's turn
 * and also the available chess accessible by both human and computer.
 *
 * Returns null if no computer player is involved
 *
 * @param {boolean} isPlayerTwoTurn
 * @param {boolean} [wildMode]
 * @param {Players} [computerIsPlayer]
 * @returns {SinglePlayerChessSetupReturns | null}
 */
const singlePlayerChessSetup = (
  isPlayerTwoTurn: boolean,
  wildMode?: boolean,
  computerIsPlayer?: Players
): SinglePlayerChessSetupReturns | null => {
  const isComputerPlayerTurn =
    (computerIsPlayer === 1 && !isPlayerTwoTurn) ||
    (computerIsPlayer === 2 && isPlayerTwoTurn);

  if (wildMode && !!computerIsPlayer) {
    return {
      isComputerPlayerTurn,
      chessMap: {
        computer: ['X', 'O'],
        player: ['X', 'O'],
      },
    };
  }

  if (computerIsPlayer === 1) {
    return {
      isComputerPlayerTurn,
      chessMap: {
        computer: ['X'],
        player: ['O'],
      },
    };
  }

  if (computerIsPlayer === 2) {
    return {
      isComputerPlayerTurn,
      chessMap: {
        computer: ['O'],
        player: ['X'],
      },
    };
  }

  return null;
};

export default singlePlayerChessSetup;
