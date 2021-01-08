import type { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import GameSelect from '~app/features/chess/components/GameSelect';
import { ChessState } from '~app/features/chess/redux';
import { AppState } from '~app/vendors/redux';

type SelectGameState = Pick<
  ChessState,
  'duration' | 'engineLevel' | 'increment' | 'playerColor'
>;

const SelectGame: FunctionComponent = () => {
  // Extracted Redux state
  const { duration, engineLevel, increment, playerColor } = useSelector<
    AppState,
    SelectGameState
  >(state => ({
    duration: state.chess.duration,
    engineLevel: state.chess.engineLevel,
    increment: state.chess.increment,
    playerColor: state.chess.playerColor,
  }));

  return (
    <GameSelect
      duration={duration}
      engineLevel={engineLevel}
      increment={increment}
      playerColor={playerColor}
    />
  );
};

export default SelectGame;
