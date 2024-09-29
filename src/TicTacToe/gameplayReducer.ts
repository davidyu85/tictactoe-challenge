import { GameplayStates, GameplayActions, ChessPiece } from './types';
import checkEndGame from './utils/checkEndGame';
import miniMax from './utils/miniMax';

const gameplayReducer = (state: GameplayStates, action: GameplayActions) => {
  const { gameState, isPlayerTwoTurn } = state;

  switch (action.type) {
    case 'place-chess': {
      const updatedGameState = [...gameState];
      updatedGameState[action.cellPos] = action.chess;

      const endGameState = checkEndGame(updatedGameState, isPlayerTwoTurn);

      return {
        ...state,
        gameState: updatedGameState,
        ...endGameState,
      };
    }

    case 'computer-place-chess': {
      const updatedGameState = [...gameState];
      const chessForComputer = isPlayerTwoTurn ? 'O' : 'X';
      let bestMove: { chess: ChessPiece; pos: number } = {
        pos: -1,
        chess: chessForComputer,
      };
      let bestScore = -Infinity;

      updatedGameState.forEach((cell, i) => {
        if (cell === null) {
          updatedGameState[i] = 'O';
          const score = miniMax(true, updatedGameState, 0, false);
          updatedGameState[i] = null;

          if (score > bestScore) {
            bestScore = score;
            bestMove = {
              chess: 'O',
              pos: i,
            };
          }
        }
      });

      updatedGameState[bestMove.pos] = bestMove.chess;

      const endGameState = checkEndGame(updatedGameState, isPlayerTwoTurn);

      return {
        ...state,
        gameState: updatedGameState,
        ...endGameState,
      };
    }
  }
};

export default gameplayReducer;
