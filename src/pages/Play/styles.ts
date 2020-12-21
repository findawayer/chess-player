import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    height: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
  },
  main: {
    display: 'flex',
    flexFlow: 'column',
  },
  sidebar: {
    width: 320,
    marginLeft: 30,
    flex: '0 0 auto',
  },
});
