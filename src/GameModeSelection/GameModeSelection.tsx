import { TicTacToeProps } from '../TicTacToe/types';
import './GameModeSelection.css';

export interface GameModes extends TicTacToeProps {
  initTime?: number;
}

interface GameModeSelectionProps {
  onClickToSwitchMode: React.Dispatch<React.SetStateAction<GameModes>>;
}

const GameModeSelection = ({ onClickToSwitchMode }: GameModeSelectionProps) => {
  const handleClickToSelectMode = (mode: GameModes) => () => {
    onClickToSwitchMode({ initTime: new Date().valueOf(), ...mode });
  };

  return (
    <div className="game-mode-selection">
      <button
        onClick={handleClickToSelectMode({
          wildMode: false,
          computerIsPlayer2: true,
        })}
      >
        Single player standard mode
      </button>

      <button
        onClick={handleClickToSelectMode({
          wildMode: false,
          computerIsPlayer2: false,
        })}
      >
        Two players standard mode
      </button>

      <button
        onClick={handleClickToSelectMode({
          wildMode: true,
          computerIsPlayer2: true,
        })}
      >
        Single player wild mode
      </button>

      <button
        onClick={handleClickToSelectMode({
          wildMode: true,
          computerIsPlayer2: false,
        })}
      >
        Two players wild mode
      </button>
    </div>
  );
};

export default GameModeSelection;
