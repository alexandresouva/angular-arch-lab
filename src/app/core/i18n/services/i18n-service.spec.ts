import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { I18nService } from './i18n-service';
import { getTranslocoModule } from 'src/testing/i18n/transloco-module';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { AVAILABLE_LANGUAGES } from '../constants/languages';
import { TranslationObject } from '../models/language.model';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [getTranslocoModule()]
    });
    service = TestBed.inject(I18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update HTML lang attribute when the language changes', () => {
    service.setActiveLang('en-US');
    expect(document.documentElement.getAttribute('lang')).toBe('en-US');

    service.setActiveLang('pt-BR');
    expect(document.documentElement.getAttribute('lang')).toBe('pt-BR');
  });

  describe('translate', () => {
    it('should translate a value when the key is found', () => {
      const result = service.translate('hello');
      expect(result).toBe('Hello');
    });

    it('should return the key when the key is not found', () => {
      const result = service.translate('invalidKey');
      expect(result).toBe('invalidKey');
    });
  });

  describe('translateSignal', () => {
    it('should update on language change and return the translated value when the key exists', fakeAsync(() => {
      runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
        const helloSignal = service.translateSignal('hello');

        tick();
        expect(helloSignal()).toBe('Hello');

        service.setActiveLang('pt-BR');
        tick();
        expect(helloSignal()).toBe('Olá');

        service.setActiveLang('es-ES');
        tick();
        expect(helloSignal()).toBe('Hola');
      });
    }));

    it('should update on language change and return the original key if no translation is found', fakeAsync(() => {
      runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
        const invalidKey = 'invalidKey';
        const invalidSignal = service.translateSignal(invalidKey);

        tick();
        expect(invalidSignal()).toBe(invalidKey);

        service.setActiveLang('pt-BR');
        tick();
        expect(invalidSignal()).toBe(invalidKey);

        service.setActiveLang('es-ES');
        tick();
        expect(invalidSignal()).toBe(invalidKey);
      });
    }));

    it('should return a reactive signal for a translation object', fakeAsync(() => {
      runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
        const authSignal = service.translateSignalObject('auth');

        tick();
        expect(authSignal()).toEqual({ login: 'Login', logout: 'Logout' });

        service.setActiveLang('pt-BR');
        tick();
        expect(authSignal()).toEqual({ login: 'Entrar', logout: 'Sair' });

        service.setActiveLang('es-ES');
        tick();
        expect(authSignal()).toEqual({
          login: 'Iniciar sesión',
          logout: 'Cerrar sesión'
        });
      });
    }));

    it('should return a key for a reactive signal when the key is not found', fakeAsync(() => {
      runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
        const invalidKey = 'invalidKey';
        const invalidSignal = service.translateSignalObject(invalidKey);

        tick();
        expect(invalidSignal()).toEqual(invalidKey);

        service.setActiveLang('pt-BR');
        tick();
        expect(invalidSignal()).toEqual(invalidKey);

        service.setActiveLang('es-ES');
        tick();
        expect(invalidSignal()).toEqual(invalidKey);
      });
    }));
  });

  describe('language', () => {
    it('should return the active language', () => {
      expect(service.getActiveLang()).toBe('en-US');

      service.setActiveLang('pt-BR');
      expect(service.getActiveLang()).toBe('pt-BR');

      service.setActiveLang('es-ES');
      expect(service.getActiveLang()).toBe('es-ES');
    });

    it('should return the available languages', () => {
      expect(service.getAvailableLangs()).toEqual([...AVAILABLE_LANGUAGES]);
    });

    it('should load language and return the translation object', fakeAsync(() => {
      const lang = 'es-ES';
      const expectedTranslation = {
        hello: 'Hola',
        auth: {
          login: 'Iniciar sesión',
          logout: 'Cerrar sesión'
        },
        status: {
          success: 'Éxito'
        }
      };
      let result: TranslationObject | undefined;

      service.loadLang(lang).subscribe((data) => (result = data));
      expect(result).toEqual(expectedTranslation);
    }));

    it('should load language and return the translation object', fakeAsync(() => {
      const invalidLang = 'invalidLang';
      let result: TranslationObject | undefined;

      service.loadLang(invalidLang).subscribe((data) => (result = data));
      expect(result).toBeUndefined();
    }));
  });
});
