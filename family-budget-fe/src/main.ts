import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { authService } from './app/core/services/auth.service';
import { appConfig } from './app/app.config';

authService.init().then(() => {
  bootstrapApplication(AppComponent, appConfig);
}).catch(err => {
  console.error('Keycloak init error', err);
});