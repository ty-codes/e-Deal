import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './styles';


const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart} ) => {
    const classes= useStyles();
    
    return (
        <Card className={classes.root}>
            <CardMedia image={item.image.url} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant='subtitle1' className={classes.name}>{item.name}</Typography>
                <Typography className={classes.priceText} variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type='button' size='small' onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                    <Typography variant='h6'>{item.quantity}</Typography>
                    <Button type='button' size='small' onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button className={classes.remove_button} variant='contained' type='button' onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem;
