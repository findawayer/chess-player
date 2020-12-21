import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  dragLayer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    pointerEvents: 'none',
  },
  dragObject: {
    cursor: 'grabbing',
  },
});
