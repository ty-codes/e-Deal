import React, {useState, useEffect} from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {useForm, FormProvider, Controller } from 'react-hook-form';
import { commerce } from '../../lib/commerce';
import {Link} from 'react-router-dom';

const AddressForm = ({checkoutToken, next}) => {
    // const methods= useForm();
    const {handleSubmit, control } = useForm();
    

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

    const rule = 'Field is required'
    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            {/* <FormProvider {... methods}> */}
                <form onSubmit={handleSubmit((data)=> { next({ ...data, shippingCountry, shippingSubdivision, shippingOption })})}>
                    <Grid container spacing={3}>
                        <Grid container >
                            <Controller
                                name="firstName"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                    label="First name"
                                    inputProps={{maxLength: 30}}
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    fullWidth            
                                    />
                                )}
                                rules= {{required: rule}}
                            />
                        </Grid>
                        <Grid container>
                            <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                label="Last name"
                                inputProps={{maxLength: 30}}
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
                                />
                            )}
                            rules= {{required: rule}}
                            />
                        </Grid>
                         
                        <Grid container>
                            <Controller
                            name="address1"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                label="Address"
                                inputProps={{maxLength: 60}}
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
                                />
                            )}
                            rules= {{required: rule}}
                        />
                        </Grid>
                         
                        <Grid container>
                            <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                type="email"
                                inputProps={{maxLength: 40}}
                                label="Email"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
																
                                />
                            )}
                            rules= {{required: rule}}
                        />
                        </Grid>
                         
                        <Grid>
                            <Controller
                            name="city"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                type="text"
                                inputProps={{type: 'text', maxLength: 30}}
                                label="City"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
                                />
                            )}
                            rules= {{required: rule}}
                        />

                        </Grid>
                        
                        <Grid container>
                            <Controller
                            name="zip"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                label="ZIP / Postal code"
                                inputProps={{ maxLength: 10, type: 'number'}}
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
																
                                />
                            )}
                            rules= {{required: rule}}
                        />
                        </Grid>
                         
                    

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
                            <Select  value={shippingSubdivision} fullWidth defaultValue="" onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                        <MenuItem key={subdivision.id} value={subdivision.id}>
                                            {subdivision.label}
                                        </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth defaultValue=""  onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button component={Link} to='/cart' variant='outlined'>Back to cart</Button>
                        <Button type='submit' disabled={!shippingOption ? true : false } variant='contained' color='primary' >Next</Button>
                    </div>
                </form>
            {/* </FormProvider> */}
        </>
    )
}

export default AddressForm
