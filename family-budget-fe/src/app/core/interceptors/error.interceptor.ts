import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { inject } from '@angular/core';
import { authService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      console.error('❌ HTTP ERROR:', req.url, error);

      // 401 → redirect login Keycloak
      if (error.status === 401) {
        toast.error('Sessione scaduta. Re-login...');
        authService.logout()
        // // redirect Keycloak
        // window.location.href = 'http://localhost:8080/realms/YOUR_REALM/protocol/openid-connect/auth';

        return throwError(() => error);
      }


      let message = 'Errore imprevisto';

      if (error.status === 0) {
        message = 'Backend non raggiungibile';
      } else if (error.status === 401) {
        message = 'Non autorizzato';
      } else if (error.status === 403) {
        message = 'Accesso negato';
      } else if (error.status >= 500) {
        message = 'Errore server';
      }

      toast.error(message);

      return throwError(() => error);
    })
  );
};