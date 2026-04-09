import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="glass-card flex-col align-center" style={{ textDecoration: 'none', display: 'flex' }}>
      <img src={product.image} alt={product.name} className="product-image" />
      <div style={{ width: '100%', marginTop: 'auto' }}>
        <div className="flex justify-between align-center" style={{ marginBottom: '0.5rem' }}>
          <span className="badge">{product.category}</span>
          <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>₹{product.price.toLocaleString('en-IN')}</span>
        </div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{product.name}</h3>
      </div>
    </Link>
  );
};

export default ProductCard;
