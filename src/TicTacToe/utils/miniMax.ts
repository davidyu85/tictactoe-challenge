import { ChessAccessMap, TicTacToeGameState } from '../types';
import checkEndGame from './checkEndGame';

const miniMax = (
  chessAccess: ChessAccessMap,
  gameState: TicTacToeGameState,
  depth: number,
  isMaxPlayer: boolean
) => {
  const isComputerTurn = !isMaxPlayer;
  const { isPlayerWins, isDraw } = checkEndGame(gameState, isComputerTurn);
  if (isPlayerWins && isComputerTurn) return 1;
  if (isPlayerWins && !isComputerTurn) return -1;
  if (isDraw) return 0;

  if (isMaxPlayer) {
    let bestScore = -Infinity;

    gameState.forEach((cell, i) => {
      if (cell === null) {
        gameState[i] = chessAccess.computer[0];
        const score = miniMax(chessAccess, gameState, depth + 1, false);
        gameState[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    });

    return bestScore;
  } else {
    let bestScore = Infinity;

    gameState.forEach((cell, i) => {
      if (cell === null) {
        gameState[i] = chessAccess.player[0];
        const score = miniMax(chessAccess, gameState, depth + 1, true);
        gameState[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    });

    return bestScore;
  }
};

export default miniMax;
