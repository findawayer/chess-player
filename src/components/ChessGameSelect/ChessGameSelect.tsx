import sample from 'lodash/sample';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import {
  setDuration,
  setEngineLevel,
  setIncrement,
  setPlayerColor,
} from '@/slices/chess';
import { ChessPieceColor } from '@/types';
import { AppDispatch } from '@/vendors/redux';
import useStyles from './styles';

interface ChessGameSelectProps {
  duration: number;
  engineLevel: number;
  increment: number;
  playerColor: ChessPieceColor | null;
}

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
        <header className={classes.header}>
          <Typography variant="h5" component="h2" className={classes.title}>
            Start a game
          </Typography>
        </header>
        <FormControl component="fieldset" className={classes.formRow}>
          <FormLabel id="duration" className={classes.formLabel}>
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
          <FormLabel id="increment" className={classes.formLabel}>
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
          <FormLabel id="mode" className={classes.formLabel}>
            Game mode
          </FormLabel>
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
            <FormLabel id="playerColor" className={classes.formLabel}>
              Play as
            </FormLabel>
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
          <FormLabel id="increment" className={classes.formLabel}>
            AI strength: {engineLevel}
          </FormLabel>
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
