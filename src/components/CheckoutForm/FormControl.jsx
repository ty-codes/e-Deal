import React from 'react';
import {TextField, Grid } from '@material-ui/core';
import {useFormContext, Controller } from 'react-hook-form';


const FormControl = ({name, label, required}) => {
    const {control} = useFormContext();
    
    return (
        <Grid item xs={12} sm={6}>
           <Controller
            render={() => (
                <TextField defaultValue=""  name={name} label={label} required={required} />
            )}
            as={TextField}
            control={control}
            fullWidth
          />   
        </Grid>  
    )
}


export default FormControl;