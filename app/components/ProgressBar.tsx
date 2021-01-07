import { LinearProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useNProgress } from '@tanem/react-nprogress';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles<
  Theme,
  Pick<ReturnType<typeof useNProgress>, 'animationDuration' | 'isFinished'>
>(theme =>
  createStyles({
    root: ({ animationDuration, isFinished }) => ({
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      zIndex: theme.zIndex.tooltip,
      opacity: isFinished ? 0 : 1,
      background: 'transparent',
      pointerEvents: 'none',
      transition: `opacity ${animationDuration}ms linear`,
    }),
    bar: ({ animationDuration }) => ({
      transitionDuration: `${animationDuration}ms`,
    }),
  }),
);

const ProgressBar: React.FC = () => {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });
  const animateIn = () => setIsAnimating(true);
  const animateOut = () => setIsAnimating(false);
  const classes = useStyles({ animationDuration, isFinished });

  // Animate progress bar when the route changes.
  useEffect(() => {
    router.events.on('routeChangeStart', animateIn);
    router.events.on('routeChangeComplete', animateOut);
    router.events.on('routeChangeError', animateOut);

    return () => {
      router.events.off('routeChangeStart', animateIn);
      router.events.off('routeChangeComplete', animateOut);
      router.events.off('routeChangeError', animateOut);
    };
  }, [router]);

  return (
    <LinearProgress
      value={progress * 100}
      variant="determinate"
      color="secondary"
      classes={{
        root: classes.root,
        bar1Determinate: classes.bar,
      }}
    />
  );
};

export default ProgressBar;
