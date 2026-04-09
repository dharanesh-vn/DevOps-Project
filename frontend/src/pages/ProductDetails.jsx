import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart(product, Number(qty));
    navigate('/cart');
  };

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="animate-fade-in">
      <Link to="/" className="btn btn-outline" style={{ marginBottom: '2rem' }}>
        Go Back
      </Link>
      
      <div className="grid grid-cols-2 align-center gap-4">
        <div>
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--glass-shadow)' }} />
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>{product.category}</span>
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.name}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
            {product.description}
          </p>
          
          <div className="flex justify-between align-center" style={{ marginBottom: '2rem', padding: '1rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: '2rem', fontWeight: 700 }}>${product.price}</span>
            <span style={{ color: product.countInStock > 0 ? '#4ade80' : '#f87171', fontWeight: 600 }}>
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {product.countInStock > 0 && (
            <div className="flex align-center gap-4" style={{ marginBottom: '2rem' }}>
              <span className="form-label" style={{ marginBottom: 0 }}>Qty:</span>
              <select 
                className="form-control" 
                value={qty} 
                onChange={(e) => setQty(e.target.value)}
                style={{ width: '100px' }}
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button 
            onClick={addToCartHandler}
            className="btn btn-primary" 
            style={{ width: '100%', padding: '15px' }}
            disabled={product.countInStock === 0}
          >
            {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
