import { HttpInterceptorFn } from '@angular/common/http';
import { authService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = authService.getToken();

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(cloned);
};
