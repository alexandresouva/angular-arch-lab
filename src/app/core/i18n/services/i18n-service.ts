import { inject, Injectable, Signal } from '@angular/core';
import {
  translateObjectSignal,
  translateSignal,
  TranslocoService
} from '@jsverse/transloco';
import {
  LanguageCode,
  LanguageDefinition,
  TranslationObject
} from '../models/language.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly translocoService = inject(TranslocoService);

  constructor() {
    this.updateHtmlLangAttributeOnLangChange();
  }

  translate(key: string): string {
    return this.translocoService.translate(key);
  }

  translateSignal(key: string): Signal<string> {
    return translateSignal(key);
  }

  translateSignalObject(key: string): Signal<TranslationObject | string> {
    return translateObjectSignal(key);
  }

  getActiveLang(): string {
    return this.translocoService.getActiveLang();
  }

  setActiveLang(lang: LanguageCode): void {
    this.translocoService.setActiveLang(lang);
  }

  getAvailableLangs(): string[] | LanguageDefinition[] {
    return this.translocoService.getAvailableLangs();
  }

  loadLang(lang: string): Observable<TranslationObject | undefined> {
    return this.translocoService.load(lang);
  }

  onLangChange$(): Observable<string> {
    return this.translocoService.langChanges$;
  }

  private setHtmlLangAttribute(lang: string): void {
    if (lang && typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', lang);
    }
  }

  private updateHtmlLangAttributeOnLangChange(): void {
    this.translocoService.langChanges$
      .pipe(takeUntilDestroyed())
      .subscribe((lang) => this.setHtmlLangAttribute(lang));
  }
}
