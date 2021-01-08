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
import sample from 'lodash/sample';
import Link from 'next/link';
import type { ChangeEvent, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import {
  setDuration,
  setEngineLevel,
  setIncrement,
  setPlayerColor,
} from '~app/features/chess/slice';
import type { ChessPieceColor } from '~app/features/chess/types';
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

interface GameSelectProps {
  duration: number;
  engineLevel: number;
  increment: number;
  playerColor: ChessPieceColor | null;
}

const GameSelect: FunctionComponent<GameSelectProps> = ({
  duration,
  engineLevel,
  increment,
  playerColor,
}) => {
  /** Action dispatcher to Redux store. */
  const dispatch = useDispatch<AppDispatch>();
  /** CSS classes created via Material-UI. */
  const classes = useStyles();

  const durationInMinutes = duration / 1000 / 60;
  const incrementInSeconds = increment / 1000;

  /** Handle changes from `duration` slider. */
  const handleDurationChange = (_: Unused, value: number | number[]) =>
    dispatch(setDuration((value as number) * 1000 * 60));

  /** Handle changes from `increment` slider. */
  const handleIncrementChange = (_: Unused, value: number | number[]) =>
    dispatch(setIncrement((value as number) * 1000));

  /** Handle changes from `mode` radio buttons. */
  const handleModeChange = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(setPlayerColor(event.target.value === 'simulate' ? null : 'w'));

  /** Handle changes from `mode` radio buttons. */
  const handlePlayerColorChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  /** Handle changes from `engineLevel` slider. */
  const handleEngineLevelChange = (_: Unused, value: number | number[]) =>
    dispatch(setEngineLevel(value as number));

  return (
    <Card elevation={2} className={classes.root}>
      <CardContent>
        <Typography variant="h3" component="h2" className={classes.title}>
          Start a chess {playerColor ? 'game' : 'simulation'}
        </Typography>
        <FormControl>
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
        <FormControl>
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
        <FormControl>
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
              label="Simulation"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
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
              disabled={!playerColor}
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              label="Black"
              value="b"
              disabled={!playerColor}
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              label="Random"
              value="random"
              disabled={!playerColor}
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
        <Link href="/play" passHref>
          <Button
            component="a"
            rel="next"
            color="primary"
            size="large"
            fullWidth
            variant="contained"
          >
            Go!
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default GameSelect;
