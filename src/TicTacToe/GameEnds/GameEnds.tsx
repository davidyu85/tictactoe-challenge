import { ReactNode } from 'react';
import {
  DRAW_STRING,
  SINGLE_PLAYER_WIN_STRING,
  TWO_PLAYER_WIN_STRING,
} from '../constants';
import { Players } from '../types';

interface GameEndsProps {
  computerIsPlayer?: Players;
  isPlayerTwoTurn: boolean;
  isPlayerWins: boolean;
  isDraw: boolean;
}

/**
 * Display end game messages
 *
 * @param {GameEndsProps} props
 * @returns {ReactNode} - This returns a void when end game is not reached, thus cannot consider an element
 */
const GameEnds = ({
  computerIsPlayer,
  isPlayerTwoTurn,
  isPlayerWins,
  isDraw,
}: GameEndsProps): ReactNode => {
  if (isDraw) {
    return <h2>{DRAW_STRING}</h2>;
  }

  if (!computerIsPlayer && isPlayerWins) {
    return <h2>{TWO_PLAYER_WIN_STRING[isPlayerTwoTurn ? 2 : 1]}</h2>;
  }

  if (computerIsPlayer === 1 && isPlayerWins) {
    return <h2>{SINGLE_PLAYER_WIN_STRING[isPlayerTwoTurn ? 1 : 2]}</h2>;
  }

  if (computerIsPlayer === 2 && isPlayerWins) {
    return <h2>{SINGLE_PLAYER_WIN_STRING[isPlayerTwoTurn ? 2 : 1]}</h2>;
  }
};

export default GameEnds;
