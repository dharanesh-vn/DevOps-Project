import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      const localCart = localStorage.getItem('cartItems');
      if (localCart) {
        setCart(JSON.parse(localCart));
      } else {
        setCart([]);
      }
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/cart', config);
      if (data && data.cartItems) {
        setCart(data.cartItems);
      }
    } catch (error) {
      console.error('Error fetching cart', error);
    }
  };

  const syncCartToBackend = async (newCartItems) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('http://localhost:5000/api/cart', { cartItems: newCartItems }, config);
    } catch (error) {
      console.error('Error syncing cart', error);
    }
  };

  const addToCart = (product, qty) => {
    const existItem = cart.find((x) => x.product === product._id || (x.product._id && x.product._id === product._id));
    
    let newCart;
    if (existItem) {
      newCart = cart.map((x) =>
        (x.product === existItem.product || x.product._id === existItem.product._id) ? { ...x, qty } : x
      );
    } else {
      newCart = [...cart, { product: product._id, qty, ...product, product: product }]; 
      // storing product object populated mostly
    }
    
    setCart(newCart);
    if (user) {
      syncCartToBackend(newCart);
    } else {
      localStorage.setItem('cartItems', JSON.stringify(newCart));
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((x) => x.product !== id && x.product._id !== id);
    setCart(newCart);
    if (user) {
      syncCartToBackend(newCart);
    } else {
      localStorage.setItem('cartItems', JSON.stringify(newCart));
    }
  };

  const clearCart = () => {
    setCart([]);
    if (user) {
      syncCartToBackend([]);
    } else {
      localStorage.removeItem('cartItems');
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
