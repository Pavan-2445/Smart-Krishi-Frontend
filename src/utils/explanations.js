export function getExplanationText(explanation, fallbackText) {
  return explanation?.text || fallbackText || '';
}

export function getExplanationSourceLabel(explanation, t) {
  if (!explanation?.source) {
    return '';
  }

  return explanation.source === 'gemini' ? t('sourceGemini') : t('sourceFallback');
}
