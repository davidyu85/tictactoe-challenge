export type ChessPiece = 'X' | 'O';

export type TicTacToeBoard = (ChessPiece | null)[];

/**
 * This is needed for single player game's Minimax, which defines the chess available for computer and player.
 * Wild variant have different set of chess pieces compares to the standard gameplay
 */
export type ChessAccessMap = { computer: ChessPiece[]; player: ChessPiece[] };

export type GameplayActions =
  | {
      type: 'place-chess';
      /** Position of the board that the chess will be placed */
      cellPos: number;
      /** As wild variant is supported in this game, this specify which chess piece is played by the player */
      chess: ChessPiece;
    }
  | {
      type: 'computer-place-chess';
      /** This determines which chess map will be used for the current game */
      wildMode?: boolean;
    };

export interface GameplayStates {
  /** This defines the grid of the board and maps the chess pieces placed on the board */
  gameBoard: TicTacToeBoard;
  /** This toggles in the game represent whether it is first player's turn or second player */
  isPlayerTwoTurn: boolean;
  /** This and isPlayerTwoTurn determines which player wins the game at terminal state */
  isPlayerWins: boolean;
  isDraw: boolean;
}
