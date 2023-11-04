import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    maxHeight: '380px',
  },
  wrapper: {
    boxShadow: '0 3px 20px rgba(0, 0, 0, 0.8)',
    backgroundColor: 'white',
    color: 'black',
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  description: {
    fontFamily: 'Montserrat'
  },
  name: {
    fontFamily: 'Montserrat',
    color: 'black',
    fontWeight: '600',
    wordSpacing: '0.1px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingRight: '10px'
  },
  name_wrap: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBlock: '1rem'
  },
  product_name: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      fontWeight: '600'
    },
    fontFamily: 'Montserrat',
    textAlign: 'left',
    paddingLeft: '7px'
  },
  img: {
    height: '250px',
    width: '100%',
  },
  demarcation: {
    border: '1px solid black',
    margin: '0 0 6px 0',
    boxShadow: '2px 2px 2px rgba(252, 114, 30, 0.8)',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    [theme.breakpoints.down('sm')]: {
      paddingTop: '36.25%'
    }
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: '10px',
    right: '10px'
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: '15px'
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  price_text: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '13px'
    },
    fontFamily: 'Montserrat',
    fontWeight: '700',
    color: '#fc721e',
    paddingRight: '6px'
  },
  contact: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBlock: '1rem'
  },
  product_details_wrap: {
    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#fc721e'
    },
    display: 'flex',
    justifyContent: 'space-between',
    height: '30px',
    backgroundColor: '#fc721e'
  },
  product_details: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
      paddingTop: '3px'
    },
    fontFamily: 'Montserrat',
    paddingLeft: '10px'

  },
  product_description: {
    margin: '0px',
    fontFamily: 'Montserrat',
    textAlign: 'justify',
    padding: '0 10px 0 10px'
  },

  spacing: {
    paddingTop: '20px'
  },
  cart_button: {
    "&:hover": {
      backgroundColor: '#fc721e',
      color: 'white'
    },
    fontFamily: 'Montserrat',
    backgroundColor: 'black',
    color: '#fc721e'
  },
  cart_icon: {
    width: '1rem',
    height: '1rem'
  }
}));