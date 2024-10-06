import { ReactElement } from 'react';
import { TicTacToeProps } from '../TicTacToe/TicTacToe';
import './GameModeSelection.css';

export interface GameModes extends TicTacToeProps {
  /** By defining a re-inializing timestamp to a key prop, it restarts the game*/
  initTime?: number;
}

interface GameModeSelectionProps {
  /** This needs to wire up to a component state */
  onClickToSwitchMode: React.Dispatch<React.SetStateAction<GameModes>>;
}

/**
 * A simple in-game menu that restarts the Tic Tac Toe game in various modes
 *
 * @param {GameModes} props
 * @returns {ReactElement}
 */
const GameModeSelection = ({
  onClickToSwitchMode,
}: GameModeSelectionProps): ReactElement => {
  // This function is curried so that the mode state can be defined at component level
  // and passes down into the prop function by invoking, without having to recreate new functions
  const handleClickToSelectMode = (mode: GameModes) => () => {
    onClickToSwitchMode({ initTime: new Date().valueOf(), ...mode });
  };

  return (
    <div className="game-mode-selection">
      <button
        onClick={handleClickToSelectMode({
          computerIsPlayer: 2,
        })}
      >
        Single player standard mode
      </button>

      <button
        onClick={handleClickToSelectMode({
          computerIsPlayer: 1,
        })}
      >
        Single player standard mode - AI first
      </button>

      <button onClick={handleClickToSelectMode({})}>
        Two players standard mode
      </button>

      <button
        onClick={handleClickToSelectMode({
          wildMode: true,
          computerIsPlayer: 2,
        })}
      >
        Single player wild mode
      </button>

      <button
        onClick={handleClickToSelectMode({
          wildMode: true,
          computerIsPlayer: 1,
        })}
      >
        Single player wild mode - AI first
      </button>

      <button
        onClick={handleClickToSelectMode({
          wildMode: true,
        })}
      >
        Two players wild mode
      </button>
    </div>
  );
};

export default GameModeSelection;
