import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AVAILABLE_LANGUAGES } from '@core/i18n/constants/languages';
import { LanguageCode } from '@core/i18n/models/language.model';
import { I18nPipe } from '@core/i18n/pipes/i18n-pipe';
import { I18nService } from '@core/i18n/services/i18n-service';
import { SelectNg } from '@shared/models/prime-ng.model';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'arch-header',
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    CommonModule,
    ButtonModule,
    SelectModule,
    FormsModule,
    RouterLink,
    I18nPipe
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private readonly _i18nService = inject(I18nService);

  protected selectedCountry = signal<SelectNg>({
    name: this._i18nService.getActiveLang().split('-')[1],
    code: this._i18nService.getActiveLang(),
    flag: `fi fi-${this._i18nService.getActiveLang().split('-')[1].toLowerCase()}`
  });
  protected readonly languages: SelectNg[] = AVAILABLE_LANGUAGES.map(
    (lang) => ({
      name: lang.id.split('-')[1],
      code: lang.id,
      flag: `fi fi-${lang.id.split('-')[1].toLowerCase()}`
    })
  );

  protected changeLanguage({ code }: SelectNg): void {
    this._i18nService.setActiveLang(code as LanguageCode);
  }
}
