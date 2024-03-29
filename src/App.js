import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Products, NavBar, Cart, Checkout } from  './components';
import { commerce } from './lib/commerce';
import {CircularProgress } from '@material-ui/core';
import './App.css';

const App = () => {
  const [products, setProducts] = useState();
  const [cart, setCart ] = useState({});
  const [order, setOrder ] = useState({});
  const [errorMsg, setErrorMsg] = useState('')

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }
  
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }
  
  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity)
    setCart(cart)
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const {cart} = await commerce.cart.remove(productId);
    setCart(cart);
  }

  const handleEmptyCart = async() => {
    const {cart} = await commerce.cart.empty();
    setCart(cart)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    
    setCart(newCart)
    
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {

      setOrder(await commerce.checkout.capture(checkoutTokenId, newOrder));
      
      refreshCart();
    } catch (error) {
      setErrorMsg(error.data.error.message)
     
      refreshCart();
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();

  }, [])

  if (!products) return (
    <div style={ {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <CircularProgress style={{'color': 'orange'}} />
    </div>);
  return (
    <Router>
      <div>
        <NavBar totalItems={cart.total_items} />
        <Routes>

          <Route exact path='/' element={ <Products products={products} onAddToCart={handleAddToCart} /> } />

          <Route exact path='/cart' element={
          <Cart
          cart={cart}
          handleUpdateCartQty={handleUpdateCartQty}
          handleRemoveFromCart={handleRemoveFromCart}
          handleEmptyCart={handleEmptyCart}
          />
          } 
          />

          <Route exact path='/checkout' element={
          <Checkout
          cart={cart}
          order={order}
          onCaptureCheckout={handleCaptureCheckout}
          error={errorMsg}
          />
          }
          />

        </Routes>
      
      </div>
    </Router>
    
  );
}

export default App;
