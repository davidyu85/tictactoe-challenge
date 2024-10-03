import { GameplayStates, TicTacToeBoard } from '../types';

type EndGame = Partial<GameplayStates>;

const ticTacToeWiningOutcomes = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkEndGame(board: TicTacToeBoard, playerTwoTurn: boolean): EndGame {
  const hasWon = ticTacToeWiningOutcomes.find(
    ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]
  );

  const boardIsFull = !board.includes(null);

  if (hasWon) {
    return {
      isPlayerWins: true,
    };
  }

  if (!hasWon && boardIsFull) {
    return {
      isDraw: true,
    };
  }

  return {
    isPlayerTwoTurn: !playerTwoTurn,
  };
}

export default checkEndGame;
