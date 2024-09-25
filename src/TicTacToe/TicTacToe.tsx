import { useState } from 'react';
import { BoardCell, GameBoard } from './Board/Board';

const TicTacToe = () => {
  const [gameState, setGameState] = useState([...Array(9).fill(null)]);

  const handleClickToPlaceChess = (cellIndex: number) => () => {
    const updatedGameState = [...gameState];
    updatedGameState[cellIndex] = 'O';
    setGameState(updatedGameState);
  };

  return (
    <GameBoard>
      {gameState.map((chess, i) => (
        <BoardCell
          key={`cell-${i}`}
          chess={chess}
          onClickOnce={handleClickToPlaceChess(i)}
        />
      ))}
    </GameBoard>
  );
};

export default TicTacToe;
