import { ReactElement, useEffect, useReducer, useRef } from 'react';
import { BoardCell, GameBoard } from './Board/Board';
import gameplayReducer, { initState } from './gameplayReducer';
import { SINGLE_PLAYER_STRING, TWO_PLAYER_TURN_STRING } from './constants';
import ChessSelect from './ChessSelect/ChessSelect';
import GameEnds from './GameEnds/GameEnds';
import { ChessPiece, TicTacToeProps } from './types';

const TicTacToe = ({
  wildMode = false,
  computerIsPlayer2 = false,
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

  useEffect(() => {
    if (computerIsPlayer2 && isPlayerTwoTurn) {
      dispatch({
        type: 'computer-place-chess',
        wildMode,
      });
    }
  }, [isPlayerTwoTurn, computerIsPlayer2, wildMode]);

  const disablePlaceChess: boolean =
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
