import { LanguageCode } from '@core/i18n/models/language.model';

export const AVAILABLE_LANGUAGES = [
  { id: 'en-US', label: 'English' },
  { id: 'pt-BR', label: 'Português' },
  { id: 'es-ES', label: 'Español' }
] as const;
export const AVAILABLE_LANGUAGES_CODES: LanguageCode[] = [
  'en-US',
  'pt-BR',
  'es-ES'
];
export const FALLBACK_LANGUAGE: LanguageCode = 'en-US';
