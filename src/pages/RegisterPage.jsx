import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import OtpInput from '../components/OtpInput';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const initialDetails = {
  phone_number: '',
  password: '',
  confirm_password: '',
  role: '',
};

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [details, setDetails] = useState(initialDetails);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const updateDetails = (event) => {
    const { name, value } = event.target;
    setDetails((current) => ({ ...current, [name]: value }));
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await api.post('/auth/register/send-otp', { email });
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
      const response = await api.post('/auth/register/verify-otp', { email, otp });
      setMessage(response.data.message);
      setStep(3);
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Unable to verify OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (details.password !== details.confirm_password) {
      setError('Password and confirm password must match.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/register/complete', {
        email,
        phone_number: details.phone_number,
        password: details.password,
        role: details.role,
      });
      login(response.data.access_token, response.data.user);
      navigate('/');
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Unable to complete registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-shell">
        <div className="auth-side-panel">
          <p className="auth-kicker">Create account</p>
          <h1>Register with email verification</h1>
          <p>Start with your email, verify OTP, then complete your details in a calm step-by-step flow.</p>
          <div className="auth-steps">
            <span className={step >= 1 ? 'active' : ''}>Email</span>
            <span className={step >= 2 ? 'active' : ''}>OTP</span>
            <span className={step >= 3 ? 'active' : ''}>Details</span>
          </div>
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
                <p className="auth-section-title">Enter the OTP</p>
                <p className="auth-section-copy">We sent a 6-digit OTP to {email}.</p>
              </div>
              <OtpInput value={otp} onChange={setOtp} />
              <button type="submit" className="auth-submit" disabled={loading || otp.length < 6}>{loading ? 'Verifying...' : 'Verify OTP'}</button>
              <button type="button" className="auth-link-button" onClick={() => setStep(1)}>Change email</button>
            </form>
          ) : null}

          {step === 3 ? (
            <form className="auth-form" onSubmit={handleCompleteRegistration}>
              <label>
                <span>Phone number with country code</span>
                <input name="phone_number" value={details.phone_number} onChange={updateDetails} placeholder="+91 98765 43210" required />
              </label>
              <label>
                <span>Role / Occupation</span>
                <input name="role" value={details.role} onChange={updateDetails} placeholder="Farmer, Agronomist, Student" required />
              </label>
              <label>
                <span>Password</span>
                <input type="password" name="password" value={details.password} onChange={updateDetails} placeholder="Create password" required />
              </label>
              <label>
                <span>Confirm password</span>
                <input type="password" name="confirm_password" value={details.confirm_password} onChange={updateDetails} placeholder="Confirm password" required />
              </label>
              <button type="submit" className="auth-submit" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</button>
            </form>
          ) : null}

          {message ? <p className="auth-message success">{message}</p> : null}
          {error ? <p className="auth-message error">{error}</p> : null}

          <p className="auth-footer-line">Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
