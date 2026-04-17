import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/orders', config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, navigate]);

  const updateStatus = async (id, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, config);
      const { data } = await axios.get('http://localhost:5000/api/orders', config);
      setOrders(data);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Admin Dashboard</h2>
      <h3 style={{ marginBottom: '1rem' }}>Manage Orders</h3>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--surface)', borderRadius: '12px', overflow: 'hidden' }}>
          <thead style={{ background: 'var(--background)' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left' }}>ORDER ID</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>USER</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>TOTAL</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>STATUS</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem' }}>{order._id.substring(0, 8)}</td>
                <td style={{ padding: '1rem' }}>{order.user?.name || 'Unknown'}</td>
                <td style={{ padding: '1rem' }}>₹{order.totalPrice.toLocaleString('en-IN')}</td>
                <td style={{ padding: '1rem' }}>
                  <span className="badge" style={{ 
                        background: order.status === 'delivered' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(202, 138, 4, 0.1)',
                        color: order.status === 'delivered' ? '#16a34a' : '#ca8a04'
                      }}>
                        {order.status}
                      </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <select 
                    className="form-control" style={{ width: '120px', padding: '5px' }}
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
