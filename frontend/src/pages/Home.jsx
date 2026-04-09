import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchProducts = async () => {
        try {
          const { data } = await axios.get('http://localhost:5000/api/products');
          setProducts(data);
          setLoading(false);
        } catch (err) {
          setError(err.response?.data?.message || err.message);
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
          Welcome to NeoCommerce
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.8' }}>
          Experience the future of seamless online shopping. We offer an exclusive, carefully curated selection of premium electronics and everyday essentials, delivered right to your doorstep. 
          Discover a platform engineered for speed, minimalism, and absolute elegance.
        </p>
        
        <div className="glass-card" style={{ padding: '3rem', marginBottom: '3rem', backgroundColor: '#f3f4f6', border: 'none' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Why Choose Us?</h2>
          <div className="grid grid-cols-2" style={{ textAlign: 'left', gap: '2rem', marginTop: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Lightning Fast</h3>
              <p style={{ color: 'var(--text-muted)' }}>Built on a modern microservices architecture ensuring your shopping experience is completely uninterrupted.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Secure Transactions</h3>
              <p style={{ color: 'var(--text-muted)' }}>Your data is protected with enterprise-grade encryption and secure JWT-based authentication.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link to="/login" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
            Sign In to Shop
          </Link>
          <Link to="/register" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-gradient" style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '2rem' }}>
        Discover the Extraordinary
      </h1>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="grid grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
