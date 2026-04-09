import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, navigate]);

  const placeOrderHandler = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      
      const orderData = {
        orderItems: cart.map(item => ({
          name: item.name || item.product.name,
          qty: item.qty,
          image: item.image || item.product.image,
          price: item.price || item.product.price,
          product: item.product._id || item.product
        })),
        shippingAddress: { address: '123 Tech St', city: 'Silicon Valley', postalCode: '94000', country: 'USA' },
        totalPrice: cart.reduce((acc, item) => acc + item.qty * (item.price || item.product.price), 0),
      };

      await axios.post('http://localhost:5000/api/orders', orderData, config);
      clearCart();
      
      // refetch orders
      const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
      setOrders(data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>My Orders</h2>
      
      {cart.length > 0 && (
         <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>You have {cart.length} items ready to order.</div>
            <button className="btn btn-primary" onClick={placeOrderHandler}>Place Order Now</button>
         </div>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {orders.length === 0 ? (
            <Message>You have no orders yet.</Message>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--surface)', borderRadius: '12px', overflow: 'hidden' }}>
              <thead style={{ background: 'var(--background)' }}>
                <tr>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>DATE</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>TOTAL</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem' }}>{order._id.substring(0, 8)}...</td>
                    <td style={{ padding: '1rem' }}>{order.createdAt.substring(0, 10)}</td>
                    <td style={{ padding: '1rem' }}>₹{order.totalPrice.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge" style={{ 
                        background: order.status === 'delivered' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(202, 138, 4, 0.1)',
                        color: order.status === 'delivered' ? '#16a34a' : '#ca8a04'
                      }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
