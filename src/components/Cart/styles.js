import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,

  title: {
    marginTop: '0',
    backgroundColor: '#fc721e',
    height: '50px',
    fontFamily: 'verdana',
    paddingTop: '10px',

   [theme.breakpoints.down('xs')]: {
      fontSize: '20px',
    },
  },

  grid: {
    minWidth: '270px'
  },

  emptyButton: {
    "&:hover": {
      backgroundColor: 'black'
    },
    minWidth: '150px',
    backgroundColor: 'white',
    color: '#fc721e'
  },
  
  checkoutButton: {
    "&:hover": {
      backgroundColor: '#fc721e'
    },
    minWidth: '150px',
    backgroundColor: 'green'
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    marginBlock: '5%',
    width: '100%',
    justifyContent: 'space-between',
    fontFamily: "Montserrat",
    alignItems: 'center'
  },
  buttons: {
    alignItems: 'flex-end',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: '0.5rem'
  }
}));