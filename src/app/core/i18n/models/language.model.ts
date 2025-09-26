import { AVAILABLE_LANGUAGES } from '../constants/languages';

export type LanguageDefinition = {
  id: string;
  label: string;
};

export type LanguageCode = (typeof AVAILABLE_LANGUAGES)[number]['id'];

export type TranslationObject<T = unknown> = Record<string, T>;
