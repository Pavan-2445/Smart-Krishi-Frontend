import { useState } from 'react';
import api from '../api/client';
import PageHero from '../components/PageHero';
import ResultSpeechControls from '../components/ResultSpeechControls';
import { useLanguage } from '../context/LanguageContext';
import { getExplanationText } from '../utils/explanations';
import '../styles/crop.css';

const initialForm = {
  N: '',
  P: '',
  K: '',
  temperature: '',
  humidity: '',
  ph: '',
  rainfall: '',
};

const fieldLabels = {
  N: 'Nitrogen',
  P: 'Phosphorus',
  K: 'Potassium',
  temperature: 'Temperature (deg C)',
  humidity: 'Humidity (%)',
  ph: 'Soil pH',
  rainfall: 'Rainfall (mm)',
};

function CropPage() {
  const { language, t } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const payload = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, Number(value)]));
      const response = await api.post(`/crop?language=${language}`, payload);
      setResult(response.data);
    } catch (submitError) {
      setError(submitError.response?.data?.detail || 'Unable to recommend a crop right now.');
    } finally {
      setLoading(false);
    }
  };

  const explanationText = getExplanationText(result?.explanation);

  return (
    <section className="crop-page">
      <PageHero eyebrow={t('cropEyebrow')} title={t('cropTitle')} description={t('cropDescription')} badge={t('cropBadge')} />

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <form onSubmit={handleSubmit} className="crop-form-panel">
          <div className="form-panel-glow" />

          <div className="grid gap-5 sm:grid-cols-2">
            {Object.entries(fieldLabels).map(([name, label]) => (
              <label key={name} className="field-card">
                <span>{label}</span>
                <input type="number" step="any" name={name} value={form[name]} onChange={handleChange} placeholder={`Enter ${label.toLowerCase()}`} required />
              </label>
            ))}
          </div>

          <button type="submit" className="crop-submit" disabled={loading}>{loading ? t('recommending') : t('recommendCrop')}</button>
          {error ? <p className="status-error">{error}</p> : null}
        </form>

        <div className="crop-result-panel">
          <div className="result-copy">
            <p className="result-kicker">{t('recommendedOutput')}</p>
            <h2 className="result-title">{result?.crop || t('cropPlaceholder')}</h2>
            <p className="result-guidance">{t('cropGuidance')}</p>
          </div>

          <div className="result-meta-card">
            <p className="meta-label">{t('outputSummary')}</p>
            <p className="meta-value">{result?.crop || t('cropPlaceholder')}</p>
          </div>

          <div className="explanation-card">
            <div className="explanation-header-row">
              <p className="meta-label">{t('explanation')}</p>
            </div>
            <p className="explanation-text">{explanationText || t('cropGuidance')}</p>
            <ResultSpeechControls text={explanationText} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CropPage;
