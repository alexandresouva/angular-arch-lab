import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from '@core/layout/layout';

@Component({
  selector: 'arch-root',
  imports: [RouterOutlet, Layout],
  template: `
    <arch-layout>
      <router-outlet></router-outlet>
    </arch-layout>
  `
})
export class App {}
