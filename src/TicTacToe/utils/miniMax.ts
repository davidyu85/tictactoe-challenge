import { ChessAccessMap, ChessPiece, TicTacToeBoard } from '../types';
import checkEndGame from './checkEndGame';

const miniMax = (
  chessMap: ChessAccessMap,
  board: TicTacToeBoard,
  isMaxPlayer: boolean,
  alpha: number,
  beta: number
): number => {
  const isComputerTurn = !isMaxPlayer;
  const { isPlayerWins, isDraw } = checkEndGame(board, isComputerTurn);
  if (isPlayerWins && isComputerTurn) return 1;
  if (isPlayerWins && !isComputerTurn) return -1;
  if (isDraw) return 0;

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
