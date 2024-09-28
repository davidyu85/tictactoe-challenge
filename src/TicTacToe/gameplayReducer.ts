import checkEndGame from './utils/checkEndGame';

export type ChessPiece = 'X' | 'O';

type GameplayActions = {
  type: 'place-chess';
  cellPos: number;
  chess: ChessPiece;
};

export interface GameplayStates {
  gameState: (ChessPiece | null)[];
  isPlayerTwoTurn: boolean;
  isPlayerWins: boolean;
  isDraw: boolean;
}

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
  }
};

export default gameplayReducer;
