import {
  EnvironmentProviders,
  isDevMode,
  provideAppInitializer,
  inject,
  makeEnvironmentProviders
} from '@angular/core';
import {
  getBrowserCultureLang,
  getBrowserLang,
  provideTransloco
} from '@jsverse/transloco';
import { I18nHttpLoader } from '@core/i18n/services/i18n-loader';
import {
  AVAILABLE_LANGUAGES,
  AVAILABLE_LANGUAGES_CODES,
  FALLBACK_LANGUAGE
} from './constants/languages';
import { LanguageCode } from './models/language.model';
import { I18nService } from './services/i18n-service';
import { firstValueFrom } from 'rxjs';

export function provideI18n(): EnvironmentProviders {
  const initialLang = getInitialLang();

  const translocoProvider = provideTransloco({
    config: {
      availableLangs: [...AVAILABLE_LANGUAGES],
      defaultLang: initialLang,
      fallbackLang: FALLBACK_LANGUAGE,
      reRenderOnLangChange: true,
      prodMode: !isDevMode()
    },
    loader: I18nHttpLoader
  });

  const i18nInitializer = provideAppInitializer(() => {
    const i18n = inject(I18nService);
    return firstValueFrom(i18n.loadLang(initialLang));
  });

  return makeEnvironmentProviders([translocoProvider, i18nInitializer]);
}

/**
 * Determines the initial language:
 * - Exact match with the browser's culture (e.g., browserCultureLang = 'en-US')
 * - Regional fallback based on prefix (e.g., getBrowserLang = 'en')
 * - Global fallback (if no match is found)
 */
function getInitialLang(): LanguageCode {
  const browserCultureLang = getBrowserCultureLang();
  const exactMatch = AVAILABLE_LANGUAGES_CODES.find(
    (lang) => lang === browserCultureLang
  );
  if (exactMatch) return exactMatch;

  const browserLang = getBrowserLang();
  if (!browserLang) return FALLBACK_LANGUAGE;

  const regionalFallback = AVAILABLE_LANGUAGES_CODES.find((lang) =>
    lang.startsWith(browserLang)
  );
  return regionalFallback ?? FALLBACK_LANGUAGE;
}
