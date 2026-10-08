import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login-service';
import { inject } from '@angular/core';

export const authGaurdGuard: CanActivateFn = (route, state) => {
 
  const aloginService = inject(LoginService); // Inject your service
  const router = inject(Router);

  if (aloginService.isLoggedIn()) {
    return true; // Access granted
  } else {
    // Redirect to login if not authenticated
    return router.parseUrl('/'); 
  }

};
