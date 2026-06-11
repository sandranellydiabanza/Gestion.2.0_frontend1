import { HttpInterceptorFn } from '@angular/common/http';

import { API_BASE_URL } from './api.config';
import { AUTH_TOKEN_KEY } from '../auth/login/loginservice';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith(API_BASE_URL) || typeof localStorage === 'undefined') {
    return next(request);
  }

  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (!token) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  );
};
