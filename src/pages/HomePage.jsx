import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/home.css';

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="home-inline-icon">
      <path d="M12 2.5L14.1 8.1L19.5 10.2L14.1 12.3L12 17.9L9.9 12.3L4.5 10.2L9.9 8.1L12 2.5Z" fill="currentColor" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="feature-icon">
      <path d="M9.2 5.2C10 3.9 11.4 3 13 3C15.5 3 17.5 5 17.5 7.5V8.1C19 8.8 20 10.3 20 12C20 14 18.6 15.7 16.8 16.1C16.8 18.3 15.1 20 12.9 20C11.6 20 10.4 19.4 9.7 18.5C8.9 19.4 7.8 20 6.5 20C4.3 20 2.5 18.2 2.5 16C2.5 14.8 3 13.7 3.9 13C3.4 12.3 3.1 11.5 3.1 10.6C3.1 8.8 4.4 7.2 6.2 6.9C6.5 5 8 3.6 9.9 3.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.7 7.3C8.8 8 8.3 9 8.3 10.2C8.3 11.7 9.2 13 10.6 13.5M13.8 6.5C14.8 7.1 15.5 8.2 15.5 9.5C15.5 11 14.5 12.4 13.1 12.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="feature-icon">
      <path d="M19.5 4.5C11.8 4.2 6.1 8.4 5.1 14.7C4.6 17.8 6.9 20.5 10 20C16.3 19 20.5 13.3 20.2 5.5C20.2 5 20 4.7 19.5 4.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 16C10.4 13.6 13.5 11.9 17 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="feature-icon">
      <path d="M7.5 18.5H16C18.8 18.5 21 16.3 21 13.5C21 10.8 18.9 8.7 16.2 8.5C15.5 6.3 13.5 4.8 11.1 4.8C8.1 4.8 5.7 7.2 5.7 10.2V10.4C3.8 10.9 2.5 12.6 2.5 14.6C2.5 16.8 4.3 18.5 6.5 18.5H7.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="feature-icon">
      <path d="M5 14H8L13 18V6L8 10H5V14Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M16 9C17.3 10 18 11.4 18 12.9C18 14.4 17.3 15.8 16 16.8M18.2 6.4C20.4 8 21.5 10.3 21.5 12.9C21.5 15.5 20.4 17.8 18.2 19.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="step-icon-svg">
      <circle cx="24" cy="24" r="22" fill="rgba(255,255,255,0.16)" />
      <path d="M24 32V16" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M18 22L24 16L30 22" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AiIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="step-icon-svg">
      <path d="M18 13.5C20.8 10.1 25.9 9.8 29.4 12.4C32.4 14.8 33.3 19 31.7 22.1C34.7 23.1 36.8 25.8 36.8 29.1C36.8 33.3 33.5 36.6 29.3 36.6H19.7C14.9 36.6 11 32.7 11 27.9C11 24.3 13.2 21.1 16.5 19.9C15.6 17.8 16 15.3 18 13.5Z" fill="#ff7eb2" />
      <circle cx="21.5" cy="27.6" r="2" fill="#ffdce9" />
      <circle cx="28.7" cy="28.2" r="1.8" fill="#ffdce9" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="step-icon-svg">
      <circle cx="24" cy="24" r="13" fill="none" stroke="#ffffff" strokeWidth="3.2" />
      <circle cx="24" cy="24" r="7" fill="none" stroke="#ff7eb2" strokeWidth="3.2" />
      <circle cx="24" cy="24" r="3" fill="#ffd772" />
    </svg>
  );
}

function WeatherIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="weather-card-icon">
      <circle cx="11" cy="10" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20.5 24H10.5C7.7 24 5.5 21.8 5.5 19C5.5 16.5 7.4 14.4 9.9 14.1C10.8 11.5 13.2 9.8 16 9.8C19.5 9.8 22.4 12.6 22.5 16.1C24.8 16.6 26.5 18.6 26.5 21C26.5 23.8 24.3 26 21.5 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const buildFeatures = (t) => [
  { title: 'AI Crop Prediction', text: t('featureCropText'), path: '/crop', icon: BrainIcon, tone: 'green' },
  { title: 'Disease Detection', text: t('featureDiseaseText'), path: '/disease', icon: LeafIcon, tone: 'teal' },
  { title: 'Weather Intelligence', text: t('featureWeatherText'), path: '/weather', icon: CloudIcon, tone: 'blue' },
  { title: 'Speech Playback', text: t('featureSpeechText'), path: '/crop', icon: SpeakerIcon, tone: 'gold' },
];

const buildSteps = (t) => [
  { step: 'Step 01', title: t('howStep1Title'), text: t('howStep1Text'), icon: UploadIcon },
  { step: 'Step 02', title: t('howStep2Title'), text: t('howStep2Text'), icon: AiIcon },
  { step: 'Step 03', title: t('howStep3Title'), text: t('howStep3Text'), icon: TargetIcon },
];

const weatherCards = [
  { title: '32°C', subtitle: 'Partly Cloudy', note: 'Good day for field preparation and sowing.', accent: 'primary' },
  { title: '68%', subtitle: 'Humidity', note: 'Moderate humidity, ideal for most crops.', accent: 'light' },
  { title: '12 km/h', subtitle: 'Wind Speed', note: 'Light breeze, safe for pesticide application.', accent: 'light' },
];

function HomePage() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const features = buildFeatures(t);
  const steps = buildSteps(t);

  return (
    <div className="home-page">
      <section id="home" className="home-hero home-hero-textual">
        <div className="hero-aura" />
        <div className="hero-copy centered">
          <div className="section-pill hero-pill">
            <SparkIcon />
            <span>{t('homeHeroEyebrow')}</span>
          </div>
          <h1 className="hero-title serif-display">
            <span>{t('homeHeroTitleOne')}</span>
            <strong>{t('homeHeroTitleTwo')}</strong>
          </h1>
          <p className="hero-description centered-copy">{t('homeHeroDescription')}</p>
          <div className="hero-actions centered-actions">
            {isAuthenticated ? (
              <>
                <Link className="hero-button primary" to="/crop">Open Dashboard</Link>
                <Link className="hero-button secondary" to="/weather">Weather Insights</Link>
              </>
            ) : (
              <>
                <Link className="hero-button primary" to="/register">{t('startFree')}</Link>
                <Link className="hero-button secondary" to="/login">Login</Link>
              </>
            )}
          </div>
          <div className="hero-highlights centered-highlights">
            <span>{t('freeToUse')}</span>
            <span>{t('multilingual')}</span>
            <span>{t('voiceSupport')}</span>
          </div>
        </div>
      </section>

      {isAuthenticated ? (
        <>
          <section className="enhancement-banner redesigned-card">
            <div>
              <p className="enhancement-kicker">{t('featureSpotlight')}</p>
              <h2 className="serif-display">{t('featureTitle')}</h2>
              <p>{t('featureDescription')}</p>
            </div>
          </section>

          <section id="features" className="content-section">
            <div className="section-heading">
              <div className="section-pill">{t('navFeatures')}</div>
              <h2 className="serif-display">{t('featuresHeading')}</h2>
              <p>{t('featuresDescription')}</p>
            </div>
            <div className="feature-grid">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Link key={feature.title} to={feature.path} className="feature-card redesigned-card">
                    <div className={`feature-icon-wrap ${feature.tone}`}>
                      <Icon />
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </Link>
                );
              })}
            </div>
          </section>

          <section id="how-it-works" className="content-section how-it-works-section">
            <div className="section-heading compact">
              <div className="section-pill">{t('navHowItWorks')}</div>
              <h2 className="serif-display">{t('howHeading')}</h2>
            </div>
            <div className="steps-grid">
              {steps.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.step} className="step-card">
                    <div className="step-icon-shell">
                      <Icon />
                    </div>
                    <p className="step-label">{item.step}</p>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="weather" className="content-section weather-preview-section">
            <div className="section-heading compact">
              <div className="section-pill weather">{t('navWeather')}</div>
              <h2 className="serif-display">{t('weatherHeading')}</h2>
            </div>
            <div className="weather-card-grid">
              {weatherCards.map((card) => (
                <article key={card.subtitle} className={`weather-preview-card ${card.accent}`}>
                  <WeatherIcon />
                  <h3>{card.title}</h3>
                  <p className="weather-subtitle">{card.subtitle}</p>
                  <p className="weather-note">{card.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="contact-strip">
            <div>
              <p className="contact-kicker">{t('navContact')}</p>
              <h2 className="serif-display">{t('contactHeading')}</h2>
              <p>{t('contactDescription')}</p>
            </div>
            <Link to="/weather" className="hero-button primary contact-button">{t('openWeatherTool')}</Link>
          </section>
        </>
      ) : (
        <section className="enhancement-banner redesigned-card gated-home-panel">
          <div>
            <p className="enhancement-kicker">Smart Access</p>
            <h2 className="serif-display">Login to unlock crop, weather, and disease tools</h2>
            <p>Create your account to access personalized farming insights, multilingual explanations, and speech-assisted guidance.</p>
          </div>
          <div className="hero-actions gated-actions">
            <Link className="hero-button primary" to="/register">{t('startFree')}</Link>
            <Link className="hero-button secondary" to="/login">Login</Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default HomePage;
