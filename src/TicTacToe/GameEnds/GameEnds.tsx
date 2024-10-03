import { ReactNode } from 'react';
import {
  DRAW_STRING,
  SINGLE_PLAYER_WIN_STRING,
  TWO_PLAYER_WIN_STRING,
} from '../constants';

interface GameEndsProps {
  computerIsPlayer2: boolean;
  isPlayerTwoTurn: boolean;
  isPlayerWins: boolean;
  isDraw: boolean;
}

const GameEnds = ({
  computerIsPlayer2,
  isPlayerTwoTurn,
  isPlayerWins,
  isDraw,
}: GameEndsProps): ReactNode => {
  if (isDraw) {
    return <h2>{DRAW_STRING}</h2>;
  }

  if (!computerIsPlayer2 && isPlayerWins) {
    return <h2>{TWO_PLAYER_WIN_STRING[isPlayerTwoTurn ? 2 : 1]}</h2>;
  }

  if (computerIsPlayer2 && isPlayerWins) {
    return <h2>{SINGLE_PLAYER_WIN_STRING[isPlayerTwoTurn ? 2 : 1]}</h2>;
  }
};

export default GameEnds;
