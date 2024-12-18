import { GameplayStates, GameplayActions, ChessPiece } from './types';
import checkEndGame from './utils/checkEndGame';
import miniMax from './utils/miniMax';

export const initState: GameplayStates = {
  gameBoard: [...Array(9).fill(null)],
  isPlayerTwoTurn: false,
  isPlayerWins: false,
  isDraw: false,
};

/**
 * State Reducer Pattern exposed through React's useReducer
 * to manage TicTacToe's advance state
 *
 * @param {GameplayStates} state - State required for Tic Tac Toe
 * @param {GameplayActions} action  - Player / computer actions that update the game states
 * @returns {GameplayStates}
 */
const gameplayReducer = (
  state: GameplayStates,
  action: GameplayActions
): GameplayStates => {
  const { gameBoard, isPlayerTwoTurn } = state;

  switch (action.type) {
    case 'place-chess': {
      const board = [...gameBoard];
      board[action.cellPos] = action.chess;

      const endGameState = checkEndGame(board, isPlayerTwoTurn);

      return {
        ...state,
        gameBoard: board,
        ...endGameState,
      };
    }

    case 'computer-place-chess': {
      const board = [...gameBoard];
      const { chessMap } = action;
      let bestMove = { score: -Infinity, pos: -1, chess: chessMap.computer[0] };

      chessMap.computer.forEach((chess: ChessPiece) => {
        for (let pos = 0; pos < board.length; pos++) {
          if (board[pos] !== null) continue;

          board[pos] = chess;
          const score = miniMax(chessMap, board, false, -Infinity, Infinity);
          board[pos] = null;

          if (score > bestMove.score) {
            bestMove = { score, chess, pos };
          }
        }
      });

      board[bestMove.pos] = bestMove.chess;

      const endGameState = checkEndGame(board, isPlayerTwoTurn);

      return {
        ...state,
        gameBoard: board,
        ...endGameState,
      };
    }
  }
};

export default gameplayReducer;
