import React from 'react';
import { useSelector } from 'react-redux';

import ChessGameSelect from '../components/ChessGameSelect';
import { ChessState } from '~/features/chess/state';
import { AppState } from '~/vendors/redux';

type SelectGameState = Pick<
  ChessState,
  'duration' | 'engineLevel' | 'increment' | 'playerColor'
>;

const SelectGame: React.FC = () => {
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
    <ChessGameSelect
      duration={duration}
      engineLevel={engineLevel}
      increment={increment}
      playerColor={playerColor}
    />
  );
};

export default SelectGame;
