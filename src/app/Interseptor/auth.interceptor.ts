// src/app/core/auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../services/login-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  const token = loginService.getToken();

  // ✅ Attach token
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      // ✅ Token expired / invalid
      if (error.status === 401 || error.status === 403) {
        loginService.logout();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};