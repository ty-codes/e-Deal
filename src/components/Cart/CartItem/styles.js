import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  media: {
    height: 260,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  cardActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fc721e'
  },
  priceText: {
    fontWeight: '700',
    color: '#fc721e'
  },
  remove_button: {
    backgroundColor: 'black',
    color: '#fc721e'
  },
  name: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingRight: '10px'
  }
}));