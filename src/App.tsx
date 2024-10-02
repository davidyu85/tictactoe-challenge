import { useState } from 'react';
import './App.css';
import TicTacToe from './TicTacToe/TicTacToe';
import GameModeSelection, {
  GameModes,
} from './GameModeSelection/GameModeSelection';

function App() {
  const [gameMode, setGameMode] = useState<GameModes>({});
  const { initTime, wildMode, computerIsPlayer2 } = gameMode;

  return (
    <>
      <h1>David Yu's Tic Tac Toe</h1>
      <GameModeSelection onClickToSwitchMode={setGameMode} />
      <TicTacToe
        key={initTime}
        wildMode={wildMode}
        computerIsPlayer2={computerIsPlayer2}
      />
    </>
  );
}

export default App;
