const voiceLocaleMap = {
  en: ['en-IN', 'en-US', 'en-GB'],
  hi: ['hi-IN', 'hi'],
  te: ['te-IN', 'te'],
};

function normalize(value) {
  return String(value || '').toLowerCase();
}

function rankVoice(voice, language) {
  const lang = normalize(voice.lang);
  const name = normalize(voice.name);
  const preferred = voiceLocaleMap[language] || voiceLocaleMap.en;

  if (preferred.some((item) => lang === normalize(item))) return 0;
  if (preferred.some((item) => lang.startsWith(normalize(item)))) return 1;
  if (name.includes('google')) return 2;
  if (language === 'en' && lang.startsWith('en')) return 3;
  return 10;
}

function resolveVoice(language) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) {
    return null;
  }

  const ranked = voices
    .map((voice) => ({ voice, score: rankVoice(voice, language) }))
    .sort((left, right) => left.score - right.score);

  return ranked[0]?.score < 10 ? ranked[0].voice : null;
}

function waitForVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return Promise.resolve([]);
  }

  const existing = window.speechSynthesis.getVoices();
  if (existing.length) {
    return Promise.resolve(existing);
  }

  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const handleVoicesChanged = () => {
      synth.removeEventListener('voiceschanged', handleVoicesChanged);
      resolve(synth.getVoices());
    };

    synth.addEventListener('voiceschanged', handleVoicesChanged);
    window.setTimeout(() => {
      synth.removeEventListener('voiceschanged', handleVoicesChanged);
      resolve(synth.getVoices());
    }, 1200);
  });
}

export async function speakText(text, language, callbacks = {}) {
  if (!text || typeof window === 'undefined' || !window.speechSynthesis) {
    callbacks.onError?.('Speech synthesis is unavailable.');
    return false;
  }

  await waitForVoices();
  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const voice = resolveVoice(language);
  const fallbackLocale = voiceLocaleMap[language]?.[0] || 'en-IN';

  utterance.lang = voice?.lang || fallbackLocale;
  if (voice) {
    utterance.voice = voice;
  }

  utterance.rate = language === 'en' ? 0.96 : 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.onstart = () => callbacks.onStart?.();
  utterance.onend = () => callbacks.onEnd?.();
  utterance.onerror = () => callbacks.onError?.('Unable to play speech for this language in the current browser voice set.');

  synth.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
