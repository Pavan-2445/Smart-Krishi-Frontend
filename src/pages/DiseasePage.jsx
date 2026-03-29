import { useEffect, useState } from 'react';
import api from '../api/client';
import PageHero from '../components/PageHero';
import ResultSpeechControls from '../components/ResultSpeechControls';
import { useLanguage } from '../context/LanguageContext';
import { getExplanationText } from '../utils/explanations';
import '../styles/disease.css';

function DiseasePage() {
  const { language, t } = useLanguage();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!file) {
      setPreviewUrl('');
      return undefined;
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(nextPreviewUrl);

    return () => URL.revokeObjectURL(nextPreviewUrl);
  }, [file]);

  const handleFileChange = (event) => {
    const nextFile = event.target.files?.[0] || null;
    setFile(nextFile);
    setResult(null);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please choose a leaf image first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', language);
      const response = await api.post('/disease/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (submitError) {
      setError(submitError.response?.data?.detail || 'Unable to detect disease right now.');
    } finally {
      setLoading(false);
    }
  };

  const diseaseName = result?.data?.disease;
  const explanationText = getExplanationText(result?.explanation, result?.data?.message || result?.message);

  return (
    <section className="disease-page">
      <PageHero eyebrow={t('diseaseEyebrow')} title={t('diseaseTitle')} description={t('diseaseDescription')} badge={t('diseaseBadge')} />

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleSubmit} className="disease-upload-panel">
          <label className="upload-dropzone">
            <span className="upload-symbol">+</span>
            <span className="mt-4 text-lg font-semibold text-slate-700">{t('chooseLeaf')}</span>
            <span className="mt-2 text-center text-sm text-slate-500">{t('uploadHint')}</span>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          <button type="submit" className="disease-submit" disabled={loading}>{loading ? t('analyzingImage') : t('detectDisease')}</button>
          {error ? <p className="status-error">{error}</p> : null}
        </form>

        <div className="disease-result-panel">
          <div className="preview-card">
            {previewUrl ? <img src={previewUrl} alt="Leaf preview" className="preview-image" /> : <div className="preview-placeholder">{t('previewPlaceholder')}</div>}
          </div>

          <div className="diagnosis-card">
            <div className="explanation-header-row">
              <p className="result-kicker">{t('detectionResult')}</p>
            </div>

            {result?.status === 'success' ? (
              <>
                <h2 className="result-title">{diseaseName || 'Prediction ready'}</h2>
                <p className="result-guidance">{t('confidence')}: {result.data?.confidence ?? '--'}</p>
                <div className="explanation-card disease-explanation-card">
                  <p className="explanation-text">{explanationText}</p>
                  <ResultSpeechControls text={explanationText} />
                </div>
              </>
            ) : result?.status === 'error' ? (
              <>
                <p className="status-error mt-4">{result.message || 'Prediction failed.'}</p>
                <div className="explanation-card disease-explanation-card">
                  <p className="explanation-text">{explanationText}</p>
                  <ResultSpeechControls text={explanationText} />
                </div>
              </>
            ) : (
              <p className="result-guidance disease-waiting-copy">{t('diseaseWaiting')}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiseasePage;
