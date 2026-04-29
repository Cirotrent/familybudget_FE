import { HttpInterceptorFn } from '@angular/common/http';
import { authService } from '../services/auth.service';
import { from, switchMap } from 'rxjs';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

//Se il token scade entro 30 secondi, rinnovalo
  return from(authService.updateToken(30)).pipe(
    switchMap(() => {

      const token = authService.getToken();

      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next(cloned);
    })
  );
};
