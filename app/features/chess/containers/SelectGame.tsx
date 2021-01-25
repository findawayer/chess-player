/* eslint-disable react/destructuring-assignment */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from '@material-ui/core';
import type { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import type { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import {
  DEFAULT_DURATION,
  DEFAULT_ENGINE_LEVEL,
  DEFAULT_INCREMENT,
  DEFAULT_MODE,
  DEFAULT_PLAYER_COLOR,
} from '~app/features/chess/constants';
import { chessActions } from '~app/features/chess/redux';
import type { ChessPieceColor } from '~app/features/chess/types';
import { useMuiRadio, useMuiSlider } from '~app/hooks';
import type { AppDispatch } from '~app/vendors/redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 350,
      textAlign: 'center',
      '& .MuiFormControl-root': {
        display: 'block',
        marginBottom: theme.spacing(3),
      },
      '& .MuiSlider-root': {
        display: 'block',
        width: 300,
        margin: '0 auto',
      },
    },
    title: {
      marginBottom: theme.spacing(5),
    },
    formRadioGroup: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);

const SelectGame: FunctionComponent = () => {
  /** Action dispatcher to Redux store. */
  const dispatch = useDispatch<AppDispatch>();
  /** Next router */
  const router = useRouter();
  /** CSS classes created via Material-UI. */
  const classes = useStyles();

  // Form values
  const [duration, handleDurationChange] = useMuiSlider(DEFAULT_DURATION);
  const [increment, handleIncrementChange] = useMuiSlider(DEFAULT_INCREMENT);
  const [mode, handleModeChange] = useMuiRadio<'play' | 'simulate'>(
    DEFAULT_MODE,
  );
  const [playerColor, handlePlayerColorChange] = useMuiRadio<
    ChessPieceColor | 'random'
  >(DEFAULT_PLAYER_COLOR);
  const [engineLevel, handleEngineLevelChange] = useMuiSlider(
    DEFAULT_ENGINE_LEVEL,
  );

  const handleSubmit = () => {
    // Reflect game settings to Redux store.
    dispatch(
      chessActions.configureGame({
        mode,
        duration: duration * 1000 * 60, // minutes to miliseconds
        increment: increment * 1000, // seconds to miliseconds
        playerColor,
        engineLevel,
      }),
    );
    // Move to game play page.
    router.push('/play');
  };

  return (
    <Card elevation={2} className={classes.root}>
      <CardContent>
        <Typography variant="h3" component="h2" className={classes.title}>
          Start a chess {playerColor ? 'game' : 'simulation'}
        </Typography>
        <FormControl>
          <FormLabel id="duration">Time per side: {duration} min.</FormLabel>
          <Slider
            aria-labelledby="duration"
            max={30}
            min={1}
            name="duration"
            onChange={handleDurationChange}
            value={duration}
            valueLabelDisplay="auto"
          />
        </FormControl>
        <FormControl>
          <FormLabel id="increment">
            Time gained per move: {increment} sec.
          </FormLabel>
          <Slider
            aria-labelledby="increment"
            max={10}
            min={0}
            name="increment"
            onChange={handleIncrementChange}
            value={increment}
            valueLabelDisplay="auto"
          />
        </FormControl>
        <FormControl>
          <FormLabel id="mode">Game mode</FormLabel>
          <RadioGroup
            aria-label="Game mode"
            className={classes.formRadioGroup}
            value={mode}
            name="mode"
            onChange={handleModeChange}
            row
          >
            <FormControlLabel
              value="play"
              control={<Radio color="primary" />}
              label="Play"
            />
            <FormControlLabel
              value="simulate"
              control={<Radio color="primary" />}
              label="Simulation"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="playerColor">Play as</FormLabel>
          <RadioGroup
            aria-label="Your preferred piece color"
            className={classes.formRadioGroup}
            name="playerColor"
            onChange={handlePlayerColorChange}
            value={playerColor}
            row
          >
            <FormControlLabel
              control={<Radio color="primary" />}
              disabled={!playerColor}
              label="White"
              value="w"
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              disabled={mode !== 'play'}
              label="Black"
              value="b"
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              disabled={mode !== 'play'}
              label="Random"
              value="random"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="increment">AI strength: {engineLevel}</FormLabel>
          <Slider
            aria-labelledby="AI level"
            color="primary"
            max={20}
            min={0}
            name="engineSkillLevel"
            onChange={handleEngineLevelChange}
            value={engineLevel}
            valueLabelDisplay="auto"
          />
        </FormControl>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          component="a"
          fullWidth
          onClick={handleSubmit}
          rel="next"
          size="large"
          variant="contained"
        >
          Go!
        </Button>
      </CardActions>
    </Card>
  );
};

export default SelectGame;
