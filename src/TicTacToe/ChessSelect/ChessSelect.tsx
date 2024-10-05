import { forwardRef, ReactElement } from 'react';
import './ChessSelect.css';

interface ChessSelectProps {
  /** When this is true, it shows the HTMLSelectElement for selecting the chess piece */
  wildMode?: boolean;
  /** This is only useful during standard gameplay, which each player is mapped to one choice of chess piece */
  isPlayerTwoTurn: boolean;
}

const ChessSelect = forwardRef<HTMLSelectElement, ChessSelectProps>(
  /**
   * This allow human players to select the chess piece in wild Tic Tac Toe variant.
   * The HTMLSelectElement is hidden during standard gameplay, but the access is availabe via React Ref
   *
   * @param {ChessSelectProps} props
   * @param {React.ForwardedRef<HTMLSelectElement>} ref
   * @returns {ReactElement}
   */
  (
    { wildMode, isPlayerTwoTurn }: ChessSelectProps,
    ref: React.ForwardedRef<HTMLSelectElement>
  ): ReactElement => {
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
