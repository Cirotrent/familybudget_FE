import { HttpInterceptorFn } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err) => {

      const message = err.error?.message || 'Errore generico';

      snackBar.open(message, 'Chiudi', {
        duration: 3000
      });

      return throwError(() => err);
    })
  );
};
