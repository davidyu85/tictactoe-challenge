import { ChessAccessMap, ChessPiece, TicTacToeGameState } from '../types';
import checkEndGame from './checkEndGame';

const miniMax = (
  chessAccess: ChessAccessMap,
  gameState: TicTacToeGameState,
  depth: number,
  isMaxPlayer: boolean,
  alphaScore: number,
  betaScore: number
) => {
  const isComputerTurn = !isMaxPlayer;
  const { isPlayerWins, isDraw } = checkEndGame(gameState, isComputerTurn);
  if (isPlayerWins && isComputerTurn) return 1;
  if (isPlayerWins && !isComputerTurn) return -1;
  if (isDraw) return 0;

  if (isMaxPlayer) {
    let bestScore = -Infinity;

    chessAccess.computer.forEach((chess: ChessPiece) => {
      for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === null) {
          gameState[i] = chess;
          const score = miniMax(
            chessAccess,
            gameState,
            depth + 1,
            false,
            alphaScore,
            betaScore
          );
          gameState[i] = null;
          bestScore = Math.max(score, bestScore);

          // Alpha-Beta Pruning - comment out the break line, the test will run almost 8 times slower
          alphaScore = Math.max(score, alphaScore);
          if (betaScore <= alphaScore) break;
        }
      }
    });

    return bestScore;
  } else {
    let bestScore = Infinity;

    chessAccess.player.forEach((chess: ChessPiece) => {
      for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === null) {
          gameState[i] = chess;
          const score = miniMax(
            chessAccess,
            gameState,
            depth + 1,
            true,
            alphaScore,
            betaScore
          );
          gameState[i] = null;
          bestScore = Math.min(score, bestScore);

          // Alpha-Beta Pruning - comment out the break line, the test will run almost 8 times slower
          betaScore = Math.min(score, betaScore);
          if (betaScore <= alphaScore) break;
        }
      }
    });

    return bestScore;
  }
};

export default miniMax;
