import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useLanguage } from './context/LanguageContext';
import HomePage from './pages/HomePage';
import CropPage from './pages/CropPage';
import WeatherPage from './pages/WeatherPage';
import DiseasePage from './pages/DiseasePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const homeNavKeys = [
  { to: '/#features', labelKey: 'navFeatures' },
  { to: '/#how-it-works', labelKey: 'navHowItWorks' },
  { to: '/#weather', labelKey: 'navWeather' },
  { to: '/#contact', labelKey: 'navContact' },
];

function ProtectedRoute({ isAuthenticated, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

function LogoMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="app-logo-mark">
      <defs>
        <linearGradient id="app-brand-stem" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1ba784" />
          <stop offset="100%" stopColor="#2f7cf6" />
        </linearGradient>
        <linearGradient id="app-brand-grain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5b544" />
          <stop offset="100%" stopColor="#f1d27c" />
        </linearGradient>
      </defs>
      <path d="M17 12C12.2 15.5 9 22.2 9 29.8C9 39.8 14.6 48.2 23 52.4V18.7C21.2 16.8 19.1 14.5 17 12Z" fill="url(#app-brand-stem)" />
      <path d="M24 14H30V52H24Z" fill="#1ba784" />
      <path d="M31.5 13.5C36.4 10.2 43 10.3 47.8 14L31.5 28.2V13.5Z" fill="url(#app-brand-grain)" />
      <path d="M32.4 25.4C36.7 22.3 42.4 22.2 46.8 25.1L32.4 37.8V25.4Z" fill="url(#app-brand-grain)" opacity="0.95" />
      <path d="M32.4 37C35.9 34.7 40.6 34.6 44 36.8L32.4 47.2V37Z" fill="url(#app-brand-grain)" opacity="0.88" />
      <path d="M13 41.5H21" stroke="#37a8ea" strokeWidth="4" strokeLinecap="round" />
      <path d="M13 34H21" stroke="#89d4ff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function App() {
  const { language, setLanguage, languages, t } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="app-shell min-h-screen bg-hero-glow text-slate-800">
      <div className="page-aura page-aura-one" />
      <div className="page-aura page-aura-two" />

      <header className="app-header">
        <div className="app-header-inner">
          <NavLink to="/" className="brand-lockup">
            <LogoMark />
            <span>Smart Krishi</span>
          </NavLink>

          <nav className="top-nav" aria-label="Primary navigation">
            {isAuthenticated && homeNavKeys.map((item) => (
              <a key={item.labelKey} className="top-nav-link" href={item.to}>
                {t(item.labelKey)}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <div className="language-toggle" aria-label={t('languageLabel')}>
              {languages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={item.code === language ? 'language-pill active' : 'language-pill'}
                  onClick={() => setLanguage(item.code)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {isAuthenticated ? (
              <div className="auth-nav-state">
                <span className="user-chip">{user?.email}</span>
                <button type="button" className="header-ghost" onClick={logout}>Logout</button>
              </div>
            ) : (
              <div className="auth-nav-state">
                <NavLink to="/login" className="header-ghost">Login</NavLink>
                <NavLink to="/register" className="header-cta">{t('getStarted')}</NavLink>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/crop"
            element={(
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CropPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/weather"
            element={(
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <WeatherPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/disease"
            element={(
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DiseasePage />
              </ProtectedRoute>
            )}
          />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div>
            <p className="footer-brand">Smart Krishi Assistant</p>
            <p className="footer-tagline">{t('footerTagline')}</p>
          </div>
          <div className="footer-contact-grid">
            <p><strong>{t('footerEmail')}:</strong> support@smartkrishi.ai</p>
            <p><strong>{t('footerPhone')}:</strong> +91 98765 43210</p>
          </div>
        </div>
        <p className="footer-rights">{t('footerRights')}</p>
      </footer>
    </div>
  );
}

export default App;
