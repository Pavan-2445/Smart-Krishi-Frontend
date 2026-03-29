import { useEffect, useState } from 'react';
import api from '../api/client';
import PageHero from '../components/PageHero';
import ResultSpeechControls from '../components/ResultSpeechControls';
import { useLanguage } from '../context/LanguageContext';
import { getExplanationText } from '../utils/explanations';
import '../styles/weather.css';

const statConfig = [
  { key: 'temperature', label: 'Temperature', unit: '°C' },
  { key: 'humidity', label: 'Humidity', unit: '%' },
  { key: 'precipitation', label: 'Rainfall', unit: ' mm' },
  { key: 'wind_speed', label: 'Wind', unit: ' kph' },
];

function WeatherPage() {
  const { language, t } = useLanguage();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationLabel, setLocationLabel] = useState(t('locationReady'));
  const [explanation, setExplanation] = useState(null);

  useEffect(() => {
    if (!weather) {
      setLocationLabel(t('locationReady'));
    }
  }, [language, t, weather]);

  const handleFetchWeather = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported in this browser.');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const response = await api.get('/weather', {
            params: { lat: coords.latitude, lon: coords.longitude, language },
          });
          setWeather(response.data.data);
          setExplanation(response.data.explanation || null);
          setLocationLabel(`Lat ${coords.latitude.toFixed(3)}, Lon ${coords.longitude.toFixed(3)}`);
        } catch (requestError) {
          setError(requestError.response?.data?.detail || 'Unable to fetch weather right now.');
        } finally {
          setLoading(false);
        }
      },
      (geoError) => {
        setError(geoError.message || 'Location permission is required.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const explanationText = getExplanationText(explanation);

  return (
    <section className="weather-page">
      <PageHero eyebrow={t('weatherEyebrow')} title={t('weatherTitle')} description={t('weatherDescription')} badge={t('weatherBadge')} />

      <div className="weather-showcase">
        <div className="weather-sky">
          <div className="sky-orb sun-glow" />
          <div className="cloud-strip cloud-one" />
          <div className="cloud-strip cloud-two" />
          <div className="rain-column rain-one" />
          <div className="rain-column rain-two" />

          <div className="weather-overlay-card">
            <p className="weather-chip">Location: {locationLabel}</p>
            <h2 className="font-display text-4xl font-bold text-slate-800 sm:text-5xl">
              {weather ? `${weather.temperature}${statConfig[0].unit}` : t('weatherReady')}
            </h2>
            <p className="mt-3 text-xl text-slate-600">{weather ? weather.condition : t('weatherWaiting')}</p>
            <button className="weather-button" type="button" onClick={handleFetchWeather} disabled={loading}>
              {loading ? t('fetchingWeather') : t('fetchWeather')}
            </button>
            {error ? <p className="status-error mt-4">{error}</p> : null}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {statConfig.map((stat) => (
            <article key={stat.key} className="weather-stat-card">
              <p className="weather-stat-label">{stat.label}</p>
              <h3 className="weather-stat-value">{weather ? `${weather[stat.key]}${stat.unit}` : `--${stat.unit}`}</h3>
            </article>
          ))}
        </div>

        <div className="weather-explanation-shell explanation-card">
          <div className="explanation-header-row">
            <p className="meta-label">{t('explanation')}</p>
          </div>
          <p className="explanation-text">{explanationText || t('weatherWaiting')}</p>
          <ResultSpeechControls text={explanationText} />
        </div>
      </div>
    </section>
  );
}

export default WeatherPage;
