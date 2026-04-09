import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Message from '../components/Message';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    if (!user) {
      navigate('/login?redirect=cart');
    } else {
      // For a real app, this would redirect to a checkout page.
      // Here we will just place the order or redirect to an order summary.
      // Since order is created from the cart, we can just say "Proceed to Shipping" or something.
      navigate('/orders');
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Shopping Cart</h2>

      {cart.length === 0 ? (
        <Message>
          Your cart is empty <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          <div>
            {cart.map((item) => (
              <div key={item.product} className="glass-panel flex align-center justify-between" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <div className="flex align-center gap-4">
                  <img src={item.image || (item.product && item.product.image)} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                  <Link to={`/product/${item.product}`} style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                    {item.name || (item.product && item.product.name)}
                  </Link>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>₹{item.price || (item.product && item.product.price)}</div>
                <select
                  className="form-control"
                  style={{ width: '80px' }}
                  value={item.qty}
                  onChange={(e) => addToCart(item, Number(e.target.value))}
                >
                  {[...Array((item.countInStock || (item.product && item.product.countInStock) || 10)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => removeFromCart(item.product)}
                  style={{ padding: '8px', border: 'none', color: '#f87171' }}
                >
                  <Trash2 size={24} />
                </button>
              </div>
            ))}
          </div>

          <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              Subtotal ({cart.reduce((acc, item) => acc + item.qty, 0)}) items
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>
              ₹{cart.reduce((acc, item) => acc + item.qty * (item.price || (item.product && item.product.price)), 0).toLocaleString('en-IN')}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={cart.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
