import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

interface Interceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}

export class ErrorInterceptor implements Interceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
