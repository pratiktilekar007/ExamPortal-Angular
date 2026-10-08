import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login-service';
import { inject } from '@angular/core';

export const publicGuard: CanActivateFn = (route, state) => {
  
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoggedIn()) {
    // If user is already logged in, send them to the dashboard
    return router.parseUrl('/admin'); 
  }

  // Otherwise, allow access to the login/register page
  return true;
};
