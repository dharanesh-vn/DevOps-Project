import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart, User as UserIcon, LogOut, Package } from 'lucide-react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <div className="container flex justify-between align-center">
        <Link to="/" className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
          NeoCommerce
        </Link>
        <nav className="nav-links">
          <Link to="/cart" className="nav-link flex align-center gap-2">
            <ShoppingCart size={20} /> Cart
          </Link>
          {user ? (
            <>
              {user.isAdmin && (
                <Link to="/admin" className="nav-link flex align-center gap-2">
                   Dashboard
                </Link>
              )}
              <Link to="/orders" className="nav-link flex align-center gap-2">
                <Package size={20} /> Orders
              </Link>
              <div className="flex align-center gap-2" style={{ color: 'var(--text-muted)' }}>
                <UserIcon size={20} /> {user.name}
              </div>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>
                <LogOut size={16} style={{ marginRight: '8px' }} /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
