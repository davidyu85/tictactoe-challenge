export interface TicTacToeProps {
  wildMode?: boolean;
  computerIsPlayer2?: boolean;
}

export type ChessPiece = 'X' | 'O';

export type TicTacToeGameState = (ChessPiece | null)[];

export type ChessAccessMap = { computer: ChessPiece[]; player: ChessPiece[] };

export type GameplayActions =
  | {
      type: 'place-chess';
      cellPos: number;
      chess: ChessPiece;
    }
  | {
      type: 'computer-place-chess';
      wildMode: boolean;
    };

export interface GameplayStates {
  gameState: TicTacToeGameState;
  isPlayerTwoTurn: boolean;
  isPlayerWins: boolean;
  isDraw: boolean;
}
