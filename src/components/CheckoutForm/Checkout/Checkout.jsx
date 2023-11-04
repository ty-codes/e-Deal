import React, {useState, useEffect} from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import useStyles from './styles';
import { Link, useNavigate } from 'react-router-dom';


const steps = ['Shipping address', 'Payment details']

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();
    
    const navigate= useNavigate();
    const [newOrder, setNewOrder] = useState({})

    useEffect(() => {
       
            setNewOrder(order)
        
    }, [order])

    useEffect(() => {
        const generateToken = async() => {
            try {
                
                if(cart.total_items>0) {
                    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'});
                                    
                    setCheckoutToken(token);
                }
                
            } catch(err) {
                
                navigate('/');
            }
        }
        generateToken();
    }, [cart])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data);
        
        nextStep();
    }


    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 2000)
    }

    let Confirmation = () => newOrder.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for shopping with us, {newOrder.customer.firstname} {newOrder.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle2'>Order ref: {newOrder.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for shopping with us</Typography>
                <Divider className={classes.divider} />
            </div>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    if (error) {
        <>
            <Typography variant='h5' >Error: {error}</Typography>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
        </>
    }

    const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next}  />
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} timeout={timeout} />

    return (
        <>
        <CssBaseline />
        <div className={classes.toolbar}>
             <main className={classes.layout}>
                 <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
                 </Paper>
             </main>
        </div>   
        </>
    )
}

export default Checkout
