import React, {useState} from 'react';
import {Typography, Button, Divider} from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)


const PaymentForm = ({ checkoutToken, backStep, shippingData, onCaptureCheckout, nextStep, timeout}) => {
    
    const [errorMsg, setErrorMsg] = useState('');
    
    const handleSubmit = async (e, elements, stripe) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        const cardElement = elements.getElement(CardElement);

        const {error} = await stripe.createPaymentMethod({type: 'card', card: cardElement });

        if(error) {
            
            setErrorMsg(error.message)
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email
                },
                shipping: {
                    name: 'Primary',
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                },
                fulfillment: {
                    shipping_method: shippingData.shippingOption
                },
                payment: {
                    gateway: "test_gateway",
                    card: {
                        number: "4242 4242 4242 4242",
                        expiry_month: "01",
                        expiry_year: "2023",
                        cvc:"123",
                        postal_zip_code: "94103"
                    }
                },
                billing: {
                    name: 'Jane Doe',
                    street: 'The palms',
                    town_city: 'Lagos',
                    county_state: 'Lagos',
                    postal_zip_code: '111222',
                    country: 'Nigeria'
                }
                
            }
            
            onCaptureCheckout(checkoutToken.id, orderData);

            timeout();

            nextStep();
        }

    }
    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant='h6' gutterBottom style={{margin: '20px 0' }}>Payment method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br /> <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant='outlined' onClick={backStep}>Back</Button>
                                <Button type='submit' variant='contained' disabled={!stripe} color='primary'>
                                    Pay { checkoutToken.live.subtotal.formatted_with_symbol }
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
            <Typography variant='subtitle2' gutterBottom style={{margin: '20px 0', color:'red' }}>{errorMsg}</Typography>

        </>
    )
}

export default PaymentForm
