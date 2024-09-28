import { DRAW_STRING, TWO_PLAYER_WIN_STRING } from '../constants';

interface GameEndsProps {
  isPlayerTwoTurn: boolean;
  isPlayerWins: boolean;
  isDraw: boolean;
}

const GameEnds = ({ isPlayerTwoTurn, isPlayerWins, isDraw }: GameEndsProps) => (
  <>
    {isPlayerWins && <h2>{TWO_PLAYER_WIN_STRING[isPlayerTwoTurn ? 2 : 1]}</h2>}
    {isDraw && <h2>{DRAW_STRING}</h2>}
  </>
);

export default GameEnds;
