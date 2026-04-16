import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div style="text-align:center; margin-top:50px">
      <h1>💰 Family Budget Manager</h1>
      <p>Gestisci il tuo bilancio familiare in modo semplice</p>
      <a mat-raised-button color="primary" routerLink="/dashboard">
        Vai alla Dashboard
      </a>
    </div>
  `,
  imports: []
})
export class WelcomeComponent {}