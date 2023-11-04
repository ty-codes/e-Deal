import React from 'react'
import {Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import {Link} from 'react-router-dom';
import {CircularProgress } from '@material-ui/core';


const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {
    const classes = useStyles();
    
    const EmptyCart = () => (
        <Typography variant="subtitle1"> You have no items in your shopping cart.
            <Link to='/' className={classes.link}>Start adding some</Link> 
        </Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id} className={classes.grid}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='subtitle1' style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div className={classes.buttons}>
                    <Button className={classes.emptyButton} size='medium' type='button' variant='contained' onClick={handleEmptyCart}> Empty Cart</Button>
                    <Button component={Link} to='/checkout' className={classes.checkoutButton} size='medium' type='button' variant='contained' >Checkout</Button>
                </div>
            </div>
        </>
    );
    if (!cart.line_items) return (
        <div style={ {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <CircularProgress style={{'color': 'orange'}} />
        </div>
    );
    return (
        <Container>
         <div className={classes.toolbar} />
         <Typography className={classes.title} gutterBottom variant='h5' > Your Shopping Cart </Typography>
         <hr/>   
         {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart;
