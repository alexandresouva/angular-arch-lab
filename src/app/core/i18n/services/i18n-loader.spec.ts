import { TestBed, waitForAsync } from '@angular/core/testing';
import { I18nHttpLoader } from './i18n-loader';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Translation } from '@jsverse/transloco';

describe('I18nHttpLoader', () => {
  let service: I18nHttpLoader;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(I18nHttpLoader);
    httpTestController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getTranslation', waitForAsync(() => {
    const lang = 'en';
    const fakeTranslation = {
      title: 'Fake title'
    };
    let result: Translation | undefined;

    service.getTranslation(lang).subscribe((translation) => {
      result = translation;
    });
    const req = httpTestController.expectOne(`/assets/i18n/${lang}.json`);
    req.flush(fakeTranslation);

    expect(req.request.method).toBe('GET');
    expect(result).toEqual(fakeTranslation);
  }));
});
