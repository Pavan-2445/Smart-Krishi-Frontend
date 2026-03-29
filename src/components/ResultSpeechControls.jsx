import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { speakText, stopSpeaking } from '../utils/speech';

function ResultSpeechControls({ text }) {
  const { language, t } = useLanguage();
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = async () => {
    await speakText(text, language, {
      onStart: () => {
        setHasPlayed(true);
        setIsSpeaking(true);
      },
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleStop = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  if (!text) {
    return null;
  }

  return (
    <div className="speech-tools">
      {!hasPlayed ? <p className="listen-hint">{t('listenSuggestion')}</p> : null}
      <div className="speech-buttons">
        <button type="button" className="speech-button" onClick={handleSpeak}>
          {t('listen')}
        </button>
        {isSpeaking ? (
          <button type="button" className="speech-button secondary" onClick={handleStop}>
            {t('stop')}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default ResultSpeechControls;
