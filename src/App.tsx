import { ReactElement, useState } from 'react';
import './App.css';
import TicTacToe from './TicTacToe/TicTacToe';
import GameModeSelection, {
  GameModes,
} from './GameModeSelection/GameModeSelection';

/**
 * Game app - Tic Tac Toe POC with in-game menu to restart the game in various modes
 * @returns {ReactElement}
 */
function App(): ReactElement {
  const [gameMode, setGameMode] = useState<GameModes>({});
  const { initTime, wildMode, computerIsPlayer } = gameMode;

  return (
    <>
      <h1>David Yu's Tic Tac Toe</h1>
      <GameModeSelection onClickToSwitchMode={setGameMode} />
      <TicTacToe
        key={initTime}
        wildMode={wildMode}
        computerIsPlayer={computerIsPlayer}
      />
    </>
  );
}

export default App;
