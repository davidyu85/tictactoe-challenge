import { ChessPiece } from '../gameplayReducer';

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

const checkEndGame = (
  gameState: (ChessPiece | null)[],
  isPlayerTwoTurn: boolean
) => {
  const hasWon = ticTacToeWiningOutcomes.find(
    ([a, b, c]) =>
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
  );

  const boardIsFull = !gameState.includes(null);

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
    isPlayerTwoTurn: !isPlayerTwoTurn,
  };
};

export default checkEndGame;
