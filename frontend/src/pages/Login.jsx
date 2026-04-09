import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Message from '../components/Message';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [history, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (!res.success) {
      setMessage(res.message);
    }
  };

  return (
    <div className="flex justify-center align-center animate-fade-in" style={{ minHeight: '60vh' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign In</h2>
        {message && <Message variant="danger">{message}</Message>}
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Sign In
          </button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          New Customer? <Link to="/register">Register Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
