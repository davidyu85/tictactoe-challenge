import { useReducer, useRef } from 'react';
import { BoardCell, GameBoard } from './Board/Board';
import gameplayReducer, { ChessPiece } from './gameplayReducer';
import { TWO_PLAYER_TURN_STRING } from './constants';
import ChessSelect from './ChessSelect/ChessSelect';

const initState = {
  gameState: [...Array(9).fill(null)],
  isPlayerTwoTurn: false,
};

const TicTacToe = ({ wildMode = false }) => {
  const [states, dispatch] = useReducer(gameplayReducer, initState);
  const { gameState, isPlayerTwoTurn } = states;
  const chessSelect = useRef<HTMLSelectElement>(null);

  const handleClickToPlaceChess = (cellPos: number) => () => {
    dispatch({
      type: 'place-chess',
      cellPos,
      chess: chessSelect.current?.value as ChessPiece,
    });
  };

  return (
    <>
      <GameBoard>
        {gameState.map((chess, i) => (
          <BoardCell
            key={`cell-${i}`}
            chess={chess}
            onClickOnce={handleClickToPlaceChess(i)}
          />
        ))}
      </GameBoard>

      <label>{TWO_PLAYER_TURN_STRING[isPlayerTwoTurn ? 2 : 1]}</label>

      <ChessSelect
        ref={chessSelect}
        wildMode={wildMode}
        isPlayerTwoTurn={isPlayerTwoTurn}
      />
    </>
  );
};

export default TicTacToe;
