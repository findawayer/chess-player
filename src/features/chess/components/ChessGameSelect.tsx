import sample from 'lodash/sample';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
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
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
  setDuration,
  setEngineLevel,
  setIncrement,
  setPlayerColor,
} from '~/features/chess/slice';
import { ChessPieceColor } from '~/types';
import { AppDispatch } from '~/vendors/redux';

interface ChessGameSelectProps {
  duration: number;
  engineLevel: number;
  increment: number;
  playerColor: ChessPieceColor | null;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    title: {
      marginBottom: theme.spacing(5),
    },
    formRow: {
      display: 'block',
      maxWidth: 320,
      margin: '0 auto',
      marginBottom: theme.spacing(3),
    },
    formRadioGroup: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);

const ChessGameSelect: React.FC<ChessGameSelectProps> = ({
  duration,
  engineLevel,
  increment,
  playerColor,
}) => {
  /** Action dispatcher to Redux store. */
  const dispatch = useDispatch<AppDispatch>();
  /** CSS classes created via Material-UI. */
  const classes = useStyles();

  // Memoized values -----

  // Converted `duration` in minute.
  const durationInMinutes = useMemo(() => duration / 1000 / 60, [duration]);
  // Converted `increment` in seconds.
  const incrementInSeconds = useMemo(() => increment / 1000, [increment]);

  // Event handlers -----

  // Handle changes from `duration` slider.
  const handleDurationChange = (_: React.ChangeEvent, value: number) =>
    dispatch(setDuration(value * 1000 * 60));

  // Handle changes from `increment` slider.
  const handleIncrementChange = (_: React.ChangeEvent, value: number) =>
    dispatch(setIncrement(value * 1000));

  // Handle changes from `mode` radio buttons.
  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setPlayerColor(event.target.value === 'simulate' ? null : 'w'));

  // Handle changes from `mode` radio buttons.
  const handlePlayerColorChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedOption = event.target.value;
    const selectedColor =
      selectedOption === 'random'
        ? // Non-null assumption is necessary because `sample` is typed as
          // it returns `undefined` in case `null` or `undefined` is passed as parameter..
          // Time to submit PR now and wait for their review.
          sample<ChessPieceColor>(['b', 'w'])!
        : (selectedOption as ChessPieceColor);
    dispatch(setPlayerColor(selectedColor));
  };

  // Handle changes from `engineLevel` slider.
  const handleEngineLevelChange = (_: React.ChangeEvent, value: number) =>
    dispatch(setEngineLevel(value));

  return (
    <Card elevation={2} className={classes.root}>
      <CardContent>
        <Typography variant="h3" component="h2" className={classes.title}>
          Start a game
        </Typography>
        <FormControl component="fieldset" className={classes.formRow}>
          <FormLabel id="duration">
            Time per side: {durationInMinutes} min.
          </FormLabel>
          <Slider
            aria-labelledby="duration"
            max={30}
            min={1}
            name="duration"
            onChange={handleDurationChange}
            value={durationInMinutes}
            valueLabelDisplay="auto"
          />
        </FormControl>
        <FormControl component="fieldset" className={classes.formRow}>
          <FormLabel id="increment">
            Time gained per move: {incrementInSeconds} sec.
          </FormLabel>
          <Slider
            aria-labelledby="increment"
            max={10}
            min={0}
            name="increment"
            onChange={handleIncrementChange}
            value={incrementInSeconds}
            valueLabelDisplay="auto"
          />
        </FormControl>
        <FormControl component="fieldset" className={classes.formRow}>
          <FormLabel id="mode">Game mode</FormLabel>
          <RadioGroup
            aria-label="Game mode"
            className={classes.formRadioGroup}
            defaultValue="play"
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
              label="AI simulation"
            />
          </RadioGroup>
        </FormControl>
        {playerColor && (
          <FormControl component="fieldset" className={classes.formRow}>
            <FormLabel id="playerColor">Play as</FormLabel>
            <RadioGroup
              aria-label="Your preferred piece color"
              className={classes.formRadioGroup}
              defaultValue="w"
              name="playerColor"
              onChange={handlePlayerColorChange}
              row
            >
              <FormControlLabel
                control={<Radio color="primary" />}
                label="White"
                value="w"
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                label="Black"
                value="b"
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                label="Random"
                value="random"
              />
            </RadioGroup>
          </FormControl>
        )}
        <FormControl component="fieldset" className={classes.formRow}>
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
        <Link href="/play">
          <Button
            color="primary"
            component="a"
            fullWidth
            rel="next"
            size="large"
            variant="contained"
          >
            Start
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ChessGameSelect;
