import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <div style="padding: 1rem">
      <h1>⚙️ Settings Micro Frontend - Standalone Mode</h1>
      <p style="color: #666; margin-bottom: 1rem">Built with Angular!</p>
      <app-settings></app-settings>
    </div>
  `
})
export class AppComponent { }
