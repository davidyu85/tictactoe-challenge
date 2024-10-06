import { ReactElement, useEffect, useMemo, useReducer, useRef } from 'react';
import { BoardCell, GameBoard } from './Board/Board';
import gameplayReducer, { initState } from './gameplayReducer';
import { SINGLE_PLAYER_STRING, TWO_PLAYER_TURN_STRING } from './constants';
import ChessSelect from './ChessSelect/ChessSelect';
import GameEnds from './GameEnds/GameEnds';
import { ChessPiece, Players } from './types';
import singlePlayerChessSetup from './utils/singlePlayerChessSetup';

export interface TicTacToeProps {
  /** Toggle between standard gameplay or wild variant */
  wildMode?: boolean;
  /** Toggle the second player to be computer or a human */
  computerIsPlayer?: Players;
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
  computerIsPlayer,
}: TicTacToeProps): ReactElement => {
  const [states, dispatch] = useReducer(gameplayReducer, initState);
  const { gameBoard, isPlayerTwoTurn, isPlayerWins, isDraw } = states;
  const chessSelect = useRef<HTMLSelectElement>(null);

  const handleClickToPlaceChess = (cellPos: number) => (): void => {
    dispatch({
      type: 'place-chess',
      cellPos,
      chess: chessSelect.current?.value as ChessPiece,
    });
  };

  const singlePlayer = useMemo(
    () => singlePlayerChessSetup(isPlayerTwoTurn, wildMode, computerIsPlayer),
    [isPlayerTwoTurn, wildMode, computerIsPlayer]
  );

  const disableBoard: boolean | undefined =
    isPlayerWins || isDraw || singlePlayer?.isComputerPlayerTurn;

  useEffect(() => {
    if (singlePlayer?.isComputerPlayerTurn) {
      dispatch({
        type: 'computer-place-chess',
        chessMap: singlePlayer.chessMap,
      });
    }
  }, [singlePlayer]);

  return (
    <>
      <GameBoard>
        {gameBoard.map((chess, i) => (
          <BoardCell
            key={`cell-${i}`}
            chess={chess}
            onClickOnce={handleClickToPlaceChess(i)}
            disabled={disableBoard}
          />
        ))}
      </GameBoard>

      <label>
        {computerIsPlayer
          ? SINGLE_PLAYER_STRING[computerIsPlayer]
          : TWO_PLAYER_TURN_STRING[isPlayerTwoTurn ? 2 : 1]}
      </label>

      {!isDraw && !isPlayerWins && (
        <ChessSelect
          ref={chessSelect}
          wildMode={wildMode}
          isPlayerTwoTurn={isPlayerTwoTurn}
        />
      )}

      <GameEnds
        computerIsPlayer={computerIsPlayer}
        isPlayerTwoTurn={isPlayerTwoTurn}
        isPlayerWins={isPlayerWins}
        isDraw={isDraw}
      />
    </>
  );
};

export default TicTacToe;
