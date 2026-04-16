import { CanActivateFn } from '@angular/router';
import { authService } from '../services/auth.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
export const authGuard: CanActivateFn = () => {
  return authService.isLogged();
};
