// @see: https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color#answer-41407246

// Special colors
const RESET = '\x1b[0m';
const DIM = '\x1b[2m';
// const UNDERSCORE = '\x1b[4m';
// const BLINK = '\x1b[5m';
// const REVERSE = '\x1b[7m';
// const HIDDEN = '\x1b[8m';

// Foreground colors
// const FGBLACK = '\x1b[30m';
const FGRED = '\x1b[31m';
// const FGGREEN = '\x1b[32m';
const FGYELLOW = '\x1b[33m';
// const FGBLUE = '\x1b[34m';
// const FGMAGENTA = '\x1b[35m';
const FGCYAN = '\x1b[36m';
// const FGWHITE = '\x1b[37m';

// Background colors
// const BGBLACK = '\x1b[40m';
// const BGRED = '\x1b[41m';
// const BGGREEN = '\x1b[42m';
// const BGYELLOW = '\x1b[43m';
// const BGBLUE = '\x1b[44m';
// const BGMAGENTA = '\x1b[45m';
// const BGCYAN = '\x1b[46m';
// const BGWHITE = '\x1b[47m';

/** Lightweight custom logger for terminal with nice colors :) */
export default {
  log(message: string): void {
    console.log(message);
  },
  info(message: string): void {
    console.log(`${FGCYAN}%s${RESET}`, message);
  },
  warn(message: string): void {
    console.warn(`${FGYELLOW}%s${RESET}`, message);
  },
  error(message: string): void {
    console.error(`${FGRED}%s${RESET}`, message);
  },
  debug(message: string): void {
    console.debug(`${DIM}%s${RESET}`, message);
  },
};
