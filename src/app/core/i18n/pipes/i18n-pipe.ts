import { ChangeDetectorRef, inject, Pipe, PipeTransform } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { switchMap, tap, startWith } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { I18nService } from '../services/i18n-service';

@Pipe({
  name: 'i18n',
  standalone: true,
  pure: false
})
export class I18nPipe implements PipeTransform {
  private readonly i18n = inject(I18nService);
  private readonly cdr = inject(ChangeDetectorRef);

  private readonly key$ = new Subject<string>();
  private lastKey?: string;
  private lastValue = '';

  constructor() {
    merge(
      this.key$,
      this.i18n.onLangChange$().pipe(startWith(this.i18n.getActiveLang()))
    )
      .pipe(
        switchMap(() => {
          if (!this.lastKey) return [];
          return this.i18n.loadLang(this.i18n.getActiveLang());
        }),
        tap(() => {
          if (this.lastKey) {
            this.lastValue = this.i18n.translate(this.lastKey);
            this.cdr.markForCheck();
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  transform(key: string): string {
    if (key !== this.lastKey) {
      this.lastKey = key;
      this.key$.next(key);
    }
    return this.lastValue;
  }
}
