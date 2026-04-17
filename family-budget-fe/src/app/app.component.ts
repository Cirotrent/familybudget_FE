import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { authService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastContainerComponent } from './features/toast/toast-container/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    ToastContainerComponent
  ]
})
export class AppComponent {

  auth = authService;

  logout() {
    this.auth.logout();
  }
}