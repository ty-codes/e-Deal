import React, {useState, useEffect} from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import {useForm, FormProvider } from 'react-hook-form';
import FormControl from './FormControl';
import { commerce } from '../../lib/commerce';
import {Link} from 'react-router-dom';

const AddressForm = ({checkoutToken, next}) => {
    const methods= useForm();

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const countries =  Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name})) 
    const subdivisions =  Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name})) 
    const options = shippingOptions.map((sO) => ({ id: sO.id, label : `${sO.description} - (${sO.price.formatted_with_symbol})`}))



    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        
        setShippingCountries(countries);

        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
    
        setShippingSubdivisions(subdivisions)
        
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region=null) => {
        const  options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
        
        setShippingOptions(options)
        shippingSubdivision==='LA' ? setShippingOption(options[1].id) : setShippingOption(options[0].id)
         
    }

    useEffect(() => {
        if(checkoutToken) fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
        
        if(shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)


    }, [shippingSubdivision])

    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider {... methods}>
                <form onSubmit={methods.handleSubmit((data) => {
                    
                    next({ ...data, shippingCountry, shippingSubdivision, shippingOption })
                    })}>
                    <Grid container spacing={3}>
                        <FormControl required name='firstName' label='First name' />
                        <FormControl required name='lastName' label='Last name' />
                        <FormControl required name='address1' label='Address' />
                        <FormControl required name='email' label='Email' />
                        <FormControl required name='city' label='City' />
                        <FormControl required name='ZIP' label='ZIP / Postal code' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth defaultValue="" onChange={(e) => setShippingCountry(e.target.value)}>
                               {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                     {country.label}
                                    </MenuItem>
                               ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth defaultValue="" onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                        <MenuItem key={subdivision.id} value={subdivision.id}>
                                            {subdivision.label}
                                        </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth defaultValue="" onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{display: 'flec', justifyContent: 'space-between'}}>
                        <Button component={Link} to='/cart' variant='outlined'>Back to cart</Button>
                        <Button type='submit' variant='contained' color='primary' >Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
