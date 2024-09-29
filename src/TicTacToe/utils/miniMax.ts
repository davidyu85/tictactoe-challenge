import { TicTacToeGameState } from '../types';
import checkEndGame from './checkEndGame';

const miniMax = (
  isComputerMove: boolean,
  gameState: TicTacToeGameState,
  depth: number,
  isMaxPlayer: boolean
) => {
  const { isPlayerWins, isDraw } = checkEndGame(gameState, isComputerMove);
  if (isPlayerWins && isComputerMove) return 1;
  if (isPlayerWins && !isComputerMove) return -1;
  if (isDraw) return 0;

  if (isMaxPlayer) {
    let bestScore = -Infinity;

    gameState.forEach((cell, i) => {
      if (cell === null) {
        gameState[i] = 'O';
        const score = miniMax(true, gameState, depth + 1, false);
        gameState[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    });

    return bestScore;
  } else {
    let bestScore = Infinity;

    gameState.forEach((cell, i) => {
      if (cell === null) {
        gameState[i] = 'X';
        const score = miniMax(false, gameState, depth + 1, true);
        gameState[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    });

    return bestScore;
  }
};

export default miniMax;
