import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.access_token, response.data.user);
      navigate('/');
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Unable to login right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-shell compact">
        <div className="auth-side-panel">
          <p className="auth-kicker">Welcome back</p>
          <h1>Login simply and continue</h1>
          <p>Use your verified email and password to return to your Smart Krishi workspace.</p>
        </div>

        <div className="auth-card">
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              <span>Email address</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="farmer@example.com" required />
            </label>
            <label>
              <span>Password</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" required />
            </label>
            <button type="submit" className="auth-submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          </form>

          {error ? <p className="auth-message error">{error}</p> : null}

          <div className="auth-footer-links">
            <Link to="/forgot-password">Forgot password?</Link>
            <span />
            <Link to="/register">Create account</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
