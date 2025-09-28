import {
  TranslocoTestingModule,
  TranslocoTestingOptions
} from '@jsverse/transloco';
import pt from './pt-BR.json';
import en from './en-US.json';
import es from './es-ES.json';
import { ModuleWithProviders } from '@angular/core';
import {
  AVAILABLE_LANGUAGES,
  FALLBACK_LANGUAGE
} from '@core/i18n/constants/languages';

export function getTranslocoModule(
  options: TranslocoTestingOptions = {}
): ModuleWithProviders<TranslocoTestingModule> {
  return TranslocoTestingModule.forRoot({
    langs: { 'en-US': en, 'pt-BR': pt, 'es-ES': es },
    translocoConfig: {
      availableLangs: [...AVAILABLE_LANGUAGES],
      defaultLang: 'en-US',
      fallbackLang: FALLBACK_LANGUAGE
    },
    preloadLangs: true,
    ...options
  });
}
