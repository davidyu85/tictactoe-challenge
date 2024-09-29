export type ChessPiece = 'X' | 'O';

export type TicTacToeGameState = (ChessPiece | null)[];

export type GameplayActions =
  | {
      type: 'place-chess';
      cellPos: number;
      chess: ChessPiece;
    }
  | {
      type: 'computer-place-chess';
    };

export interface GameplayStates {
  gameState: TicTacToeGameState;
  isPlayerTwoTurn: boolean;
  isPlayerWins: boolean;
  isDraw: boolean;
}
