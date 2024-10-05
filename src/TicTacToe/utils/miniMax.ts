import { ChessAccessMap, ChessPiece, TicTacToeBoard } from '../types';
import checkEndGame from './checkEndGame';

/**
 * The Minimax recursive function for finding the best move for computer opponent.
 * Alpha-Beta Pruning is added to improve the decision making efficiency.
 * This can be observed by commenting out the Alpha-Beta process while running unit test on watch mode.
 *
 * @param {ChessAccessMap} chessMap - Chess access by computer and player, the more access available, the more game state needs to calculate
 * @param {TicTacToeBoard} board - State of the game
 * @param {boolean} isMaxPlayer - While backtracking, stating whether it is the maximizing player's turn
 * @param {number} alpha - Alpha score for Alpha-Beta Pruning
 * @param {number} beta - Beta score for Alpha-Beta Pruning
 * @returns {number} - The score number determining whether this is the best move or not
 */
const miniMax = (
  chessMap: ChessAccessMap,
  board: TicTacToeBoard,
  isMaxPlayer: boolean,
  alpha: number,
  beta: number
): number => {
  // A human player tries move would be a computer player. Because this is checking for terminal state,
  // the leaf node is whatever comes next. The below does not meant computer is not a maximizing player.
  const tryMoveBelongsToComputer = !isMaxPlayer;
  const { isPlayerWins, isDraw } = checkEndGame(
    board,
    tryMoveBelongsToComputer
  );
  if (isPlayerWins && tryMoveBelongsToComputer) return 1;
  if (isPlayerWins && !tryMoveBelongsToComputer) return -1;
  if (isDraw) return 0;

  // If is not terminal state, keep on running Minimax till reaching to leaf node
  if (isMaxPlayer) {
    let bestScore = -Infinity;

    chessMap.computer.forEach((chess: ChessPiece) => {
      let pos = board.length;

      while (pos--) {
        if (board[pos] !== null) continue;

        board[pos] = chess;
        const score = miniMax(chessMap, board, false, alpha, beta);
        board[pos] = null;
        bestScore = Math.max(score, bestScore);

        // Alpha-Beta Pruning - comment out the break line,
        // computer wild mode integration test will run 10 times slower
        alpha = Math.max(score, alpha);
        if (beta <= alpha) break;
      }
    });

    return bestScore;
  } else {
    let bestScore = Infinity;

    chessMap.player.forEach((chess: ChessPiece) => {
      let pos = board.length;

      while (pos--) {
        if (board[pos] !== null) continue;

        board[pos] = chess;
        const score = miniMax(chessMap, board, true, alpha, beta);
        board[pos] = null;
        bestScore = Math.min(score, bestScore);

        // Alpha-Beta Pruning - comment out the break line,
        // computer wild mode integration test will run 10 times slower
        beta = Math.min(score, beta);
        if (beta <= alpha) break;
      }
    });

    return bestScore;
  }
};

export default miniMax;
