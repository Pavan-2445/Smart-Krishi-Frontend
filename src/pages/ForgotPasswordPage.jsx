import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import OtpInput from '../components/OtpInput';
import '../styles/auth.css';

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await api.post('/auth/forgot-password/send-otp', { email });
      setMessage(response.data.message);
      setStep(2);
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Unable to send OTP right now.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await api.post('/auth/forgot-password/verify-otp', { email, otp });
      setMessage(response.data.message);
      setStep(3);
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Unable to verify OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Password and confirm password must match.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/forgot-password/reset', { email, password });
      setMessage(response.data.message);
      setTimeout(() => navigate('/login'), 1000);
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Unable to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-shell compact">
        <div className="auth-side-panel">
          <p className="auth-kicker">Reset password</p>
          <h1>Recover access with OTP</h1>
          <p>Verify your email, enter the OTP, and set a fresh password in a simple flow.</p>
        </div>

        <div className="auth-card">
          {step === 1 ? (
            <form className="auth-form" onSubmit={handleSendOtp}>
              <label>
                <span>Email address</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="farmer@example.com" required />
              </label>
              <button type="submit" className="auth-submit" disabled={loading}>{loading ? 'Sending OTP...' : 'Send OTP'}</button>
            </form>
          ) : null}

          {step === 2 ? (
            <form className="auth-form" onSubmit={handleVerifyOtp}>
              <div>
                <p className="auth-section-title">Verify OTP</p>
                <p className="auth-section-copy">We sent a 6-digit OTP to {email}.</p>
              </div>
              <OtpInput value={otp} onChange={setOtp} />
              <button type="submit" className="auth-submit" disabled={loading || otp.length < 6}>{loading ? 'Verifying...' : 'Verify OTP'}</button>
            </form>
          ) : null}

          {step === 3 ? (
            <form className="auth-form" onSubmit={handleResetPassword}>
              <label>
                <span>New password</span>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="New password" required />
              </label>
              <label>
                <span>Confirm new password</span>
                <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm new password" required />
              </label>
              <button type="submit" className="auth-submit" disabled={loading}>{loading ? 'Updating...' : 'Reset password'}</button>
            </form>
          ) : null}

          {message ? <p className="auth-message success">{message}</p> : null}
          {error ? <p className="auth-message error">{error}</p> : null}

          <p className="auth-footer-line">Remembered it? <Link to="/login">Back to login</Link></p>
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordPage;
