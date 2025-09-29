import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { ArchPreset } from './constants/preset';

export function provideTheme(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: ArchPreset,
        options: {
          darkModeSelector: false
        }
      }
    })
  ]);
}
