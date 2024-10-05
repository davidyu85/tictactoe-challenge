import { ReactElement, useEffect, useReducer, useRef } from 'react';
import { BoardCell, GameBoard } from './Board/Board';
import gameplayReducer, { initState } from './gameplayReducer';
import { SINGLE_PLAYER_STRING, TWO_PLAYER_TURN_STRING } from './constants';
import ChessSelect from './ChessSelect/ChessSelect';
import GameEnds from './GameEnds/GameEnds';
import { ChessPiece } from './types';

export interface TicTacToeProps {
  /** Toggle between standard gameplay or wild variant */
  wildMode?: boolean;
  /** Toggle the second player to be computer or a human */
  computerIsPlayer2?: boolean;
}

/**
 * A proof of concept of Tic Tac Toe game, supporting
 * - standard 3 X 3 grid Tic Tac Toe gameplay
 * - wild variant, allowing players to play both X and O
 * - single player game play with a computer player
 *
 * @param {TicTacToeProps} props
 * @returns {ReactElement}
 */
const TicTacToe = ({
  wildMode,
  computerIsPlayer2,
}: TicTacToeProps): ReactElement => {
  // State Reducer Pattern is introduced here
  const [states, dispatch] = useReducer(gameplayReducer, initState);
  const { gameBoard, isPlayerTwoTurn, isPlayerWins, isDraw } = states;

  // This reference to a HTMLSelectElement, which is useful to grab the native selected
  // value, without enforcing the element being unnecessarily controlled by React
  const chessSelect = useRef<HTMLSelectElement>(null);

  const handleClickToPlaceChess = (cellPos: number) => (): void => {
    dispatch({
      type: 'place-chess',
      cellPos,
      chess: chessSelect.current?.value as ChessPiece,
    });
  };

  // This determines the turn belongs to a computer opponent,
  // this triggers the function finding the best move for the computer.
  useEffect(() => {
    if (computerIsPlayer2 && isPlayerTwoTurn) {
      dispatch({
        type: 'computer-place-chess',
        wildMode,
      });
    }
  }, [isPlayerTwoTurn, computerIsPlayer2, wildMode]);

  // We need to ensure disabling the board access when end game is reached or
  // computer is still finding the next move
  const disablePlaceChess: boolean | undefined =
    isPlayerWins || isDraw || (isPlayerTwoTurn && computerIsPlayer2);

  return (
    <>
      <GameBoard>
        {gameBoard.map((chess, i) => (
          <BoardCell
            key={`cell-${i}`}
            chess={chess}
            onClickOnce={handleClickToPlaceChess(i)}
            disabled={disablePlaceChess}
          />
        ))}
      </GameBoard>

      {!computerIsPlayer2 ? (
        <label>{TWO_PLAYER_TURN_STRING[isPlayerTwoTurn ? 2 : 1]}</label>
      ) : (
        <label>{SINGLE_PLAYER_STRING}</label>
      )}

      <ChessSelect
        ref={chessSelect}
        wildMode={wildMode}
        isPlayerTwoTurn={isPlayerTwoTurn}
      />

      <GameEnds
        computerIsPlayer2={computerIsPlayer2}
        isPlayerTwoTurn={isPlayerTwoTurn}
        isPlayerWins={isPlayerWins}
        isDraw={isDraw}
      />
    </>
  );
};

export default TicTacToe;
