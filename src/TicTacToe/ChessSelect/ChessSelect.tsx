import { forwardRef, ReactElement } from 'react';
import './ChessSelect.css';

interface ChessSelectProps {
  wildMode: boolean;
  isPlayerTwoTurn: boolean;
}

const ChessSelect = forwardRef<HTMLSelectElement, ChessSelectProps>(
  ({ wildMode, isPlayerTwoTurn }, ref): ReactElement => {
    const wildSetup = (
      <>
        <small>Wild mode allows you to play either X or O</small>
        <select ref={ref}>
          <option value="X">X</option>
          <option value="O">O</option>
        </select>
      </>
    );

    const standardSetup = (
      <>
        <small>Standard mode lets you play {isPlayerTwoTurn ? 'O' : 'X'}</small>
        <select ref={ref} hidden>
          {isPlayerTwoTurn ? (
            <option value="O">O</option>
          ) : (
            <option value="X">X</option>
          )}
        </select>
      </>
    );

    return (
      <div className="chess-select">{wildMode ? wildSetup : standardSetup}</div>
    );
  }
);

export default ChessSelect;
